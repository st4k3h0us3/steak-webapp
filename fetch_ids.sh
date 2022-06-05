#!/usr/bin/env bash
#terrad query staking validators -o json --limit 200 > /tmp/validators.json
#list=$(jq <  /tmp/validators.json -r '.validators[] | [.operator_address, .description.identity, .description.moniker] | @csv' | column -t -s"," )
list=$(jq <  /tmp/validators.json -r '.validators[] | [.description.identity] | @csv' | column -t -s"," | tr -d \" ) 

for id in $list
do
	kb=$(curl -sL https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${id}\&fields=pictures )
	url=$(echo ${kb}|jq -r '.them[] | .pictures.primary.url')
	echo $id $url
	curl -so  public/${id}.jpeg $url
done
