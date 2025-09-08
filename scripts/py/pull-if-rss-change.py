#!/usr/bin/env python

import requests

def check_rss_for_changes(url, etag=None, last_modified=None):
    """
    Checks an RSS feed URL for changes using HTTP ETag and Last-Modified headers.

    Args:
        url (str): The URL of the RSS feed.
        etag (str, optional): The ETag header from the previous request. Defaults to None.
        last_modified (str, optional): The Last-Modified header from the previous request. Defaults to None.

    Returns:
        tuple: A tuple containing (status_code, content, new_etag, new_last_modified).
               Returns (304, None, etag, last_modified) if no changes.
               Returns (200, content, new_etag, new_last_modified) if content has changed.
               Returns a non-standard tuple on error.
    """
    # Create headers to send to the server based on previous request data
    request_headers = {}
    if etag:
        request_headers['If-None-Match'] = etag
    if last_modified:
        request_headers['If-Modified-Since'] = last_modified

    print(f"Checking {url}...")
    print(f"  Request Headers: {request_headers}")

    try:
        # Make the GET request with the conditional headers
        response = requests.get(url, headers=request_headers, timeout=10)
        
        # Check the response status code
        status_code = response.status_code
        print(f"  Response Status Code: {status_code}")

        # If the content has changed, the server will send a 200 OK
        if status_code == 200:
            print("  Changes detected! The feed has been updated.")
            # Get the new ETag and Last-Modified headers for the next check
            new_etag = response.headers.get('ETag')
            new_last_modified = response.headers.get('Last-Modified')
            return status_code, response.text, new_etag, new_last_modified
        
        # If the content has not changed, the server will send a 304 Not Modified
        elif status_code == 304:
            print("  No changes detected. The feed is up-to-date.")
            return status_code, None, etag, last_modified

        # Handle other HTTP status codes
        else:
            print(f"  Warning: Unexpected status code received: {status_code}")
            return status_code, None, None, None

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching the RSS feed: {e}")
        return 0, None, None, None # Use 0 or a custom code to indicate an error

if __name__ == "__main__":
    # Example usage:
    # This URL is a placeholder. Replace with an actual RSS feed URL.
    feed_url = "https://codeberg.org/pal-id/www/rss/branch/master"
    
    # Simulate a first check
    print("--- First Check ---")
    status, content, etag_val, last_mod_val = check_rss_for_changes(feed_url)

    # In a real application, you would save `etag_val` and `last_mod_val`
    # to a database or file for the next check.
    
    print("\n--- Simulating a Second Check (after a short delay) ---")
    # Pass the stored values to the function for the next call
    status, content, etag_val, last_mod_val = check_rss_for_changes(
        feed_url,
        etag=etag_val,
        last_modified=last_mod_val
    )