#!/bin/sh
set -e

echo "Replacing environment variables in JS files..."

# Find main JS file with the environment variable declarations
JS_FILE=$(find /usr/src/app -name "*.js" -type f -exec grep -l "FIREBASE_API_KEY" {} \; | head -n 1)

if [ -z "$JS_FILE" ]; then
  echo "Warning: Could not find JS file with environment variables. Skipping replacement."
  exit 0
fi

# Replace each environment variable
replace_var() {
  VAR_NAME=$1
  VAR_VALUE=${!VAR_NAME}
  
  if [ -n "$VAR_VALUE" ]; then
    # Look for patterns like: FIREBASE_API_KEY:"abc123" or FIREBASE_API_KEY: "abc123"
    sed -i "s|${VAR_NAME}:[[:space:]]*\"[^\"]*\"|${VAR_NAME}:\"${VAR_VALUE}\"|g" $JS_FILE
    echo "Replaced $VAR_NAME in $JS_FILE"
  fi
}

# Replace all environment variables
replace_var "GOOGLE_MAPS_API_KEY"
replace_var "FIREBASE_USERNAME"
replace_var "FIREBASE_PASSWORD"
replace_var "HECTOR_BASE_URL"
replace_var "HECTOR_USERNAME"
replace_var "HECTOR_TYPE"
replace_var "FIREBASE_API_KEY"
replace_var "FIREBASE_AUTH_DOMAIN"
replace_var "FIREBASE_DATABASE_URL"
replace_var "FIREBASE_PROJECT_ID"
replace_var "FIREBASE_STORAGE_BUCKET"
replace_var "FIREBASE_MESSAGING_SENDER_ID"
replace_var "FIREBASE_APP_ID"
replace_var "FIREBASE_MEASUREMENT_ID"

echo "Environment variable replacement complete."