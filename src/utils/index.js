//sprint.reactをコピーしただけ
import AWS from "aws-sdk";

const bucketName = "react.sprint";
const identityPoolId = "ap-northeast-1:131db146-e5b9-4f7b-8b58-d0c59e2deeaf";
const maxPhotosFromBucket = 125;

AWS.config.update({
  region: "ap-northeast-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  }),
});

const bucket = new AWS.S3({
  params: {
    Bucket: bucketName,
  },
});

export function listObjects(number) {
  if (typeof number !== "number")
    throw new Error(`listObjects expects a number. Got: ${typeof number}`);

  if (number < 1)
    throw new Error(
      "listObjects number should be a non-zero positive integer."
    );

  if (number > maxPhotosFromBucket)
    throw new Error(
      `listObjects number should not exceed ${maxPhotosFromBucket}.`
    );

  const listObjects = new Promise((resolve, reject) => {
    bucket.listObjects({ MaxKeys: `${number}` }, (error, data) => {
      if (error) reject(new Error(error));

      let sortedByDateData = data.Contents.sort(function (a, b) {
        a = new Date(a.LastModified);
        b = new Date(b.LastModified);
        return a > b ? -1 : a < b ? 1 : 0;
      });

      resolve(sortedByDateData);
    });
  });

  return listObjects;
}

export function getSingleObject(key) {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject(
      {
        Bucket: bucketName,
        Key: key,
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data.Body.toString("base64"));
      }
    );
  });

  return getSingleObject;
}

export function saveObject(file) {
  const saveObject = new Promise((resolve, reject) => {
    bucket.putObject(
      {
        Key: file.name,
        Body: file,
        ACL: "public-read",
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data);
      }
    );
  });

  return saveObject;
}
