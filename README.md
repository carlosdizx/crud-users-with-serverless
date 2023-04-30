# Hello world with Serverless and Typescript

## Steps to deploy the project
1. Clone the template project with the following command:
``` 
serverless create --path hello-world --template-url https://github.com/carlosdizx/hola-mundo-serverless
```
2. Install project dependencies with ``` npm install ```
3. Configure AWS credentials with the following command:
```
serverless config credentials --provider aws --key <tu-aws-access-key> --secret <tu-aws-secret-key>
```
4. To deploy the project, run the command ``` npm run deploy ```

