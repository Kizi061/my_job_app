let AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'us-east-1' });
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const isEnabled = false;
    const result = [];
    const date = new Date();
    const inputData = [
        {
            id: 11,
            status: 'queue',
            type: 'import'
        },
        {
            id: 12,
            status: 'queue',
            type: 'import'
        },
        {
            id: 13,
            status: 'queue',
            type: 'export'
        }, {
            id: 14,
            status: 'queue',
            type: 'import'
        },
        {
            id: 15,
            status: 'queue',
            type: 'export'
        }];

    console.log('date ====>', date);
    console.log('passed data ====>', inputData[0]);

    if (isEnabled) {
        inputData.forEach((data, i) => {
            data.status = 'running';

            const newlambda = invokeAsyncLambda('job-runner', data)
            result.push(newlambda);
        });
    }

    console.log('result -------->', result);
};

const invokeAsyncLambda = async (functionName, payload) => {
    console.log('invokeAsyncLambda -------->', functionName);

    let result = {};
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload),
        InvocationType: 'Event',
        // LogType: LogType.Tail,
    };

    try {
        const response = await lambda.invoke(params).promise();
        const responsePayload = JSON.parse(response.Payload);
        result = responsePayload;
    } catch (error) {
        console.error(`Error invoking function ${functionName}:`, error);
        result = { error: `Error invoking function ${functionName}` }
    }

    return result;
};