const AWS = require("aws-sdk");

const updateTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done, title, description } = JSON.parse(event.body);
    const updatedAt = new Date();

    const { Attributes } = await dynamodb
      .update({
        TableName: "taskTable",
        Key: {
          id,
        },
        UpdateExpression:
          "set done = :done, title = :title, description = :description",
        ExpressionAttributeValues: {
          ":done": done,
          ":title": title,
          ":description": description,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return {
      status: 200,
      body: Attributes,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  updateTask,
};
