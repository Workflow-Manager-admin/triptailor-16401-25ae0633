#!/bin/bash
cd /home/kavia/workspace/code-generation/triptailor-16401-25ae0633/triptailor_webapp
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

