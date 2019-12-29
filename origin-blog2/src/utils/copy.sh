#!/bin/sh
cd /Users/oyo/Desktop/Node/origin-blog2/logs
cp access.log $(date +%Y-%m-%d-%H-%M-%S).access.log
echo "" > access.log