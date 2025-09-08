#!/usr/bin/env python

titles = []

with open("/tmp/palid-ids.txt", "r") as file:
    for l in file:
        clean_line = l.strip()
        titles.append("* [/" + clean_line + "](" + clean_line + ")")

with open("mains/hardcoded-ids.md", mode="wt", encoding="utf-8") as myfile:
    myfile.write('\n'.join(titles))
    myfile.write('\n')

