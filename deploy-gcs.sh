#!/usr/bin/env bash
gcloud config set project tutor-204108
gsutil -m rm -r gs://tutor-events/event/richman-questionnaire
gulp package
gulp uploadGcs