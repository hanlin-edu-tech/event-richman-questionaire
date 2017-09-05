#!/bin/bash
test="http://test.ehanlin.com.tw/event/api/Deploy"
production="http://www.ehanlin.com.tw/event/api/Deploy"
repository="{\"Repository\":\"event-ad-hswriting\",\"Tag\":\"${TRAVIS_TAG}\",\"Owner\":\"eHanlin\",\"Password\":\"${EHANLIN_PW}\",\"Name\":\"ad-hswriting\"}"
contentTypeJson="Content-Type: application/json"

case "${TRAVIS_TAG}" in
*SNAPSHOT*)
	echo "deploy to test"
	#curl -X POST -H 'Content-Type: application/json' -d "{\"Repository\":\"event-ad-hswriting\",\"Tag\":\"${TRAVIS_TAG}\",\"Owner\":\"eHanlin\",\"Password\":\"${EHANLIN_PW}\",\"Name\":\"ad-hswriting\"}" 'http://www.ehanlin.com.tw/event/api/Deploy'
	curl -X POST -H "${contentTypeJson}" -d "${repository}" "${test}"
	;;
*)
	echo "deploy to production"
	curl -X POST -H "${contentTypeJson}" -d "${repository}" "${production}"
	;;
esac
