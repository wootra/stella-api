#!/bin/bash
scp -i /c/users/shjeon/.ssh/wootra-key.pem *.* .* ec2-user@18.223.92.250:/home/ec2-user/stella-api
scp -i /c/users/shjeon/.ssh/wootra-key.pem -r ./apis ./auth ./db ./scripts ./uploads ec2-user@18.223.92.250:/home/ec2-user/stella-api
