.PHONY: change
change:
	python -m http.server 8093

.PHONY: consent-and-contemporary
consent-and-contemporary:
	git aa && git cm "You lot should cease oogling the git logs and start actively supporting me instead, FFS" && git po && git push github && git push bitbucket

.PHONY: update-file-list
update-file-list:
	find . -type f | sed 's/^\.\///' > assets/data/files.csv

.PHONY: update-hardcoded-ids-list
update-hardcoded-ids-list:
	find . -name ".id-hardcoded" | sed 's/^\.\///' | sed 's/.id-hardcoded//' > /tmp/palid-ids.txt
	scripts/py/hardcoded-ids-to-markdown.py
	
.PHONY: count-tlds
count-tld:
	cat assets/data/subs/tlds.html | grep "domain tld" | wc -l  > assets/data/subs/count-tlds.txt

.PHONY: extract-linkedin
extract-linkedin:
	find a-first-serie-of-peecs -name "index.html" | xargs sed 's/"/\n/g' - | grep "linkedin.com/comp" | sort | uniq > assets/data/peecs-li-urls.csv

.PHONY: mirror-a-psychoticks-tale
 mirror-a-psychoticks-tale:
	cp ~/dev