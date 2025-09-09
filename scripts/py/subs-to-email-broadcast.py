#!/usr/bin/env python

import json

def get_domains_from_json(file_path):
    """
    Opens a JSON file, loops through its content, and prints the domain key.

    Args:
        file_path (str): The path to the JSON file to be processed.
    """
    try:
        # Open the file in read mode ('r') using a 'with' statement.
        # This ensures the file is automatically closed.
        with open(file_path, 'r', encoding='utf-8') as file:
            # Load the JSON data from the file.
            data = json.load(file)

            # Check if the data is a list to be able to loop over it.
            if isinstance(data, list):
                # Loop over each item (dictionary) in the list.
                for item in data:
                    # Check if the 'domain' key exists in the dictionary before trying to access it.
                    if 'domain' in item:
                        dom = item['domain']
                        if dom != "":
                            if not "/" in dom:
                                print("impressum@"+item['domain'])
                                print("info@"+item['domain'])
                                print("admin@"+item['domain'])
                                print("support@"+item['domain'])
                    else:
                        print("Warning: 'domain' key not found in an item.")
            else:
                print(f"Error: The JSON content in '{file_path}' is not a list of maps.")

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except json.JSONDecodeError:
        print(f"Error: The file '{file_path}' is not a valid JSON file.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # Define the path to your JSON file.
    file_path = "assets/data/extract-linkedin.json"
    
    # Call the function to process the file.
    get_domains_from_json(file_path)
