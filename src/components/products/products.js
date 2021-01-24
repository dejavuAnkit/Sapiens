import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { useForm } from "../../customHooks/useform";
import Button from "../button/ButtonComponent";
import Input from "../input/Input";
import ImageUploader from "../imageUploader/imageUploader";
import * as UploadActionCreator from "../../store/actionCreators/upload/upload";
import * as postActionCreator from "../../store/actionCreators/posts/posts";
import * as purchaseActionCreator from "../../store/actionCreators/purchase/purchase";
import * as pstyle from "./products.css";
import Pimage from "./images/no-image.png";

const Products = () => {
  const dispatch = useDispatch();
  const postid = useRef();

  const uploadReducer = useSelector((state) => state.uploadReducer);
  const googleReducer = useSelector((state) => state.googleLoginReducer);
  const loginReducer = useSelector((state) => state.loginReducer);
  const postReducer = useSelector((state) => state.postReducer);
  const postData = useSelector((state) => state.postDataReducer);

  const { formValid, setFormValidHandler, getFormValues } = useForm([
    "adname",
    "area",
    "bedroom",
    "price",
  ]);

  const createPostHanlder = () => {
    console.log("Post will be created");
    const { email: gemail } = googleReducer;
    const { email } = loginReducer;

    const postEmail = email || gemail;

    dispatch(
      postActionCreator.createPost({
        postid: +new Date(),
        email : postEmail,
      })
    );
  };

  const inputHandler = (data) => {
    setFormValidHandler(data);
  };

  const uploadImage = (fname) => {
    postid.current = +new Date();
    dispatch(
      UploadActionCreator.uploadImage({
        image: fname,
        createdby: "A",
        postid: postid.current,
      })
    );
  };

  const savePost = () => {
    const { images } = uploadReducer;
    const { postid } = postReducer;
    const { email: gemail } = googleReducer;
    const { email } = loginReducer;

    const postEmail = email || gemail;
    var postData = {
      images,
      postid,
      email:postEmail,
    };
    var userObj = getFormValues();
    postData["adname"] = userObj["adname"]["value"];
    postData["area"] = userObj["area"]["value"];
    postData["bedroom"] = userObj["bedroom"]["value"];
    postData["price"] = userObj["price"]["value"];
    dispatch(postActionCreator.updatePost(postData));
  };

  useEffect(() => {
    const { email: gemail, userType: GUserType } = googleReducer;
    const { email, userType } = loginReducer;

    const postEmail = email || gemail;
    if (userType === "S" || GUserType==='S') {
       dispatch(postActionCreator.getMyPost(postEmail));
    } else {
      dispatch(postActionCreator.getAllPost());
    }
    
  }, []);

  const background = formValid ? "#1eba68" : "#ccc";

  const purchaseHandler = (data) => {
    const { email: gemail } = googleReducer;
    const { email } = loginReducer;

    const postEmail = email || gemail;
    const { postid } = data;
    dispatch(purchaseActionCreator.purchaseRequest({
      email: postEmail,
      postid
    }))
  };

  return (
    <div className="product_container">
      <div className="product_toolbar">
        {postReducer.status === "INIT" && (loginReducer.userType === "S" || googleReducer.userType === "S") && (
          <Button
            name="create"
            id="create"
            label="Create Add"
            handler={createPostHanlder}
            customStyle={{
              marginBottom: "10px",
              background: "#1eba68",
              color: "#eee",
              cursor: "pointer",
              border: "none",
            }}
          />
        )}
      </div>
      <div className="product_list_page">
        {postReducer.status === "COMPLETED" && !postReducer.hasError && (
          <div className="create_post">
            <div className="row">
              <div className="col-6 col-s-12">
                <Input
                  name="adname"
                  id="adname"
                  label="Add Name"
                  required
                  nomargin
                  handler={inputHandler}
                />
              </div>
              <div className="col-6 col-s-12">
                <Input
                  name="area"
                  id="area"
                  label="Area"
                  required
                  nomargin
                  handler={inputHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-s-12">
                <Input
                  name="bedromm"
                  id="bedroom"
                  label="No of Rooms"
                  required
                  nomargin
                  handler={inputHandler}
                />
              </div>
              <div className="col-6 col-s-12">
                <Input
                  name="price"
                  id="price"
                  label="Price"
                  required
                  nomargin
                  handler={inputHandler}
                />
              </div>
            </div>
            <div className="imagePreview">
              {uploadReducer.images.map((data, index) => {
                return (
                  <div className="thumbnail" key={index}>
                    <img src={data} />
                  </div>
                );
              })}
            </div>
            <div className="row">
              <div className="col-6 col-s-12">
                <ImageUploader upload={uploadImage} />
              </div>
            </div>
            <div class="row" style={{justifyContent:'center'}}>
              <Button
                name="post"
                id="post"
                label="Post Ad"
                disabled={!formValid}
                handler={savePost}
                customStyle={{
                  width: "100%",
                  marginBottom: "10px",
                  background: background,
                  color: "#eee",
                  cursor: "pointer",
                  border: "none",
                }}
              />
            </div>
          </div>
        )}
        {postData.posts && postData.posts.length ? (
          <div className="post_list_container">
            {postData.posts.map((data, index) => {
              return (
                <div className="col-6" style={{display:"inline-block", marginBottom: "10px"}}>
                  <Card>
                    <Card.Img
                      style={{ maxHeight: "207px" }}
                      variant="top"
                      src={data.images[0] ? data.images[0] : Pimage}
                    />
                    <Card.Body>
                      <Card.Title>{data.description}</Card.Title>
                      <Card.Text>
                        <p>
                          <strong>Rooms:</strong> {data.bedroom}
                        </p>
                        <p>
                          <strong>Price:</strong> {data.price}
                        </p>
                        <p>
                          <strong>Area:</strong> {data.area}
                        </p>
                      </Card.Text>
                      <div className="f-center">
                        <Button
                          name="buy"
                          id="buy"
                          label="Purchase"
                          handler={()=>{
                            purchaseHandler(data)
                          }}
                          customStyle={{
                            marginBottom: "10px",
                            background: "#1eba68",
                            color: "#eee",
                            cursor: "pointer",
                            border: "none",
                          }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div>You have not posted any Adver</div>
        )}
      </div>
    </div>
  );
};

export default Products;
