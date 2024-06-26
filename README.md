# Upload File to MongoDB

This program will set `/api/upload` to be a POST endpoint that handles file uploading to a Cloudinary server and storing the link to a MongoDB database.
This uses Multer to temporary store the file in the server, which it will send to Cloudinary.


https://github.com/cocoman043/uploadFile2MongoDB/assets/129296131/be4f5500-3ab1-4115-a4c7-a2bc468815d9


## Dependencies

- node
- npm

## Usage

1. Install all node modules with
```bash
npm i
```
2. Create a `.env` file based on the `.env.example` file containing the keys for Cloudinary and MongoDB.
3. Start the app with `npm start`.
4. Use the `/api/upload` endpoint by either:
 - Starting the web client:
```bash
cd client
npm i
npm run dev
```
 - Sending a POST requst directly (Postman, Insomnia, curl, etc.):
```bash
curl --request POST \
  --url http://localhost:5000/api/upload \
  --header 'Content-Type: multipart/form-data' \
  --form pdf=@/absolute/path/to/file
```

## Reference

[![Video](https://img.youtube.com/vi/3Gj_mL9JJ6k/maxresdefault.jpg)](https://www.youtube.com/watch?v=3Gj_mL9JJ6k)
