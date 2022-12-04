# Council API

## About

Simple API for storing Fantasy Council Committees

## Dev

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Infrastructure

## AWS

Useful commands - but doesn't work b/c rds complains about availability
- `aws rds describe-db-engine-versions --engine postgres --query "DBEngineVersions[].EngineVersion"`
- `aws cloudformation deploy --stack-name council-api-db --template-file rds.yaml`
- `aws cloudformation describe-stack-events --stack-name council-api-db`
- `aws cloudformation delete-stack --stack-name council-api-db`

## PostgreSQL
- `psql -h council-database.c3czhr8x7opz.us-east-1.rds.amazonaws.com -U councildb -W council-database`