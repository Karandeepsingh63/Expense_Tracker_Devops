# End-to-End DevOps Implementation for Expense Tracker (CI/CD, Docker, Kubernetes, Monitoring)

### Project Overview

This project is a DevOps-based deployment of an Expense Tracker application built with a React frontend, Node.js/Express backend, and MongoDB database. The goal of this project is to implement a complete DevOps workflow covering source control, CI/CD, containerization, security scanning, container registry management, Kubernetes deployment, and monitoring.

The application is designed using a microservices-style approach, where the frontend, backend, and database run in separate containers and Kubernetes pods. The workflow includes GitHub for source code management, Jenkins and GitHub Actions for automation, Docker for containerization, Trivy for vulnerability scanning, Amazon ECR for image storage, Minikube for local Kubernetes deployment, and Prometheus with Grafana for monitoring and observability.

This project was built to strengthen practical DevOps skills and make the application deployment process more automated, scalable, secure, and production-oriented.

Objective

The objective of this project is to transform a full-stack Expense Tracker application into a complete DevOps project by implementing CI/CD, containerization, vulnerability scanning, image management through Amazon ECR, Kubernetes-based deployment, and monitoring with Prometheus and Grafana.

Architecture

### Architecture

The project uses a microservices-style architecture where the React frontend, Node.js/Express backend, and MongoDB database run as separate containers and Kubernetes pods. Source code is stored in GitHub, GitHub Actions automates build and security scan stages. Docker images are scanned with Trivy and pushed to Amazon ECR. The application is deployed locally on Minikube, and Prometheus with Grafana is used for monitoring and visualization. Terraform can be added to provision infrastructure such as ECR repositories.

### Tech Stack

React, Node.js, Express, MongoDB, GitHub, Jenkins, GitHub Actions, Docker, Trivy, Amazon ECR, Kubernetes (Minikube), Prometheus, Grafana, and Terraform.



### Containerization

Docker is used to containerize the backend service to ensure consistency across different environments.

A Dockerfile is created for the backend application using a  **multi-stage build approach** , which helps reduce the final image size by separating the build and runtime environments. This improves efficiency and keeps the production image lightweight.

Additionally, a **non-root user is created and used inside the container** as a security best practice. This prevents the application from running with root privileges and reduces potential security risks.

After creating the Dockerfile, the image is built locally using Docker to verify that the backend service runs correctly inside a containerized environment.

The image below shows the successful build of the backend Docker image.


![1774444030547](image/Project/1774444030547.png)



![1774250516275](image/Project/1774250516275.png)


### Frontend Containerization

The frontend is containerized using a multi-stage Docker build where Node.js is used to build the React app, and Nginx is used to serve the static files. Nginx is chosen for its high performance, efficient static content delivery, and production readiness.




![1774444233927](image/Project/1774444233927.png)

![1774273235865](image/Project/1774273235865.png)


After building the Docker images, the containers are started locally. The `docker ps` command is used to verify that both the frontend and backend containers are running successfully.

This step confirms that the services are properly containerized and functioning as expected in a local environment.

![1774273212059](image/Project/1774273212059.png)


### Docker Compose

Before using Docker Compose, the frontend and backend containers had to be started individually, which is not efficient from a DevOps perspective. To simplify the workflow, a `docker-compose.yml` file is created to run both services together with a single command.

This improves developer productivity, reduces manual effort, and makes the local setup more consistent and easier to manage.

![1774274041377](image/Project/1774274041377.png)

![1774274064613](image/Project/1774274064613.png)




### Jenkins Pipeline

As Jenkins is widely used in industry-standard CI/CD workflows, it was initially selected for this project. A Jenkins pipeline was created to automate the core CI tasks, including source code checkout from SCM, building Docker images for both the frontend and backend services, and scanning both images using Trivy for vulnerability detection.

During implementation, the main challenge was pipeline automation. To trigger Jenkins automatically, two common approaches were considered: **polling** and  **webhooks** . Polling requires Jenkins to check the repository at regular time intervals, which is not the most efficient approach. The better practice is to use  **webhooks** , where GitHub notifies Jenkins immediately after a code push. However, webhook setup was more difficult to implement in the local environment.

Because of this challenge, Jenkins was used mainly to understand and practice the CI pipeline flow, while full automation was later handled more effectively through GitHub Actions.

![1774283720861](image/Project/1774283720861.png)


### GitHub Actions Workflow

GitHub Actions was used to automate the CI/CD pipeline on every push to the `main` branch. The workflow checks out the code, configures AWS credentials, builds Docker images for both the frontend and backend services, and scans them using Trivy for vulnerability detection.

![1774289015860](image/Project/1774289015860.png)



GitHub Secrets are used to securely store sensitive information like AWS credentials instead of hardcoding them in the workflow, ensuring better security and best practices.

![1774445307532](image/Project/1774445307532.png)


Terraform

Befre

![1774290862712](image/Project/1774290862712.png)

![1774290955596](image/Project/1774290955596.png)

![1774291152892](image/Project/1774291152892.png)

![1774291120338](image/Project/1774291120338.png)

![1774291200709](image/Project/1774291200709.png)

![1774293941684](image/Project/1774293941684.png)

![1774293957542](image/Project/1774293957542.png)

![1774293971983](image/Project/1774293971983.png)

![1774293990418](image/Project/1774293990418.png)

k8

yeh niche vale 2 delete krne hai okay

![1774337784664](image/Project/1774337784664.png)

![1774337838477](image/Project/1774337838477.png)

yha pe explain krna ki maine abhi sb manually deploy kra hai for testing everything is wrokig fine or

![1774349451324](image/Project/1774349451324.png)

![1774348807608](image/Project/1774348807608.png)

yha pe ab batana hai ki haa locally sb chl pdha hai ab bari hai ki mei cd part bhi automate kru with help of argocd

![1774349634374](image/Project/1774349634374.png)

![1774349607217](image/Project/1774349607217.png)

![1774350027921](image/Project/1774350027921.png)

![1774350095859](image/Project/1774350095859.png)

![1774350044665](image/Project/1774350044665.png)

![1774353417507](image/Project/1774353417507.png)

![1774373554478](image/Project/1774373554478.png)

![1774373755219](image/Project/1774373755219.png)

![1774374772573](image/Project/1774374772573.png)
