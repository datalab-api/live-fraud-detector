#!/bin/bash
# Generate certificates for your API nodejs live fraud demo 

API_DN="/C=FR/ST=IDF/L=PARIS/O=KYDRYL"   

mkdir -p certs

# Root CA
openssl genrsa -out certs/ca.key 2048
openssl req -new -x509 -sha256 -days 1095 -subj "$API_DN/CN=CA" -key certs/ca.key -out certs/ca.pem

# Admin
openssl genrsa -out certs/admin-temp.key 2048
openssl pkcs8 -inform PEM -outform PEM -in certs/admin-temp.key -topk8 -nocrypt -v1 PBE-SHA1-3DES -out certs/admin.key
openssl req -new -subj "$API_DN/CN=ADMIN" -key certs/admin.key -out certs/admin.csr
openssl x509 -req -in certs/admin.csr -CA certs/ca.pem -CAkey certs/ca.key -CAcreateserial -sha256 -out certs/admin.pem


