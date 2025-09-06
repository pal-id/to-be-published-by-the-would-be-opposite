#!/bin/bash

find a-first-serie-of-peecs -name "index.html" | xargs sed 's/"/\n/g' - | grep "linkedin.com/comp" | sort | uniq > assets/data/peecs-li-urls.csv