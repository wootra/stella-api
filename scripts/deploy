#!/bin/bash
scp -i /c/users/wootra/.ssh/wootra-key.pem *.* .* ec2-user@18.223.49.113:/home/ec2-user/stella-api
scp -i /c/users/wootra/.ssh/wootra-key.pem -r ./apis ./auth ./db ./scripts ./uploads ec2-user@18.223.49.113:/home/ec2-user/stella-api
