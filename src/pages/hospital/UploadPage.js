import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {  useToasts } from 'react-toast-notifications';
const SUPPORT_IMAGE_FORMATS = ['image/jpg','image/jpeg']

const UploadPage = () => {
  const history = useHistory();
  const { addToast } = useToasts()

  const { handleSubmit, errors, register } = useForm();
  const onSubmit = (data) => {
      try{
        console.log(data);
        let fileUpload = data.picture[0]
        const reader = new FileReader()
        reader.readAsDataURL(fileUpload)
        reader.onload = async ( e ) => {
            let base64Image = e.target.result
            const urlAPI = 'https://api.codingthailand.com/api/upload'
            const resp = await axios.post(urlAPI,{
            picture: base64Image
        })
        addToast(resp.data.data.message, { 
            appearance: 'success'
           // autoDismiss: true,
           // autoDismissTimeout=6000
        })
       // alert(resp.data.data.message)
        //console.log(resp.data.data.url)
        history.replace('/')

       }
    }catch(error){
        console.log(errors)
         addToast(JSON.stringify(error), { 
            appearance: 'error'
           // autoDismiss: true,
           // autoDismissTimeout=6000
        })

      }
    
  
}

  return (
    <div className="container mt-4">
      <Row>
        <Col md={4}>
          <h1>Upload รูปภาพเท่านั้น</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="formFile" className="form-label">
                เลือกไฟล์ภาพที่นี่
              </label>
              <input
                className={`form-control-file ${
                  errors.picture ? "is-invalid" : ""
                }`}
                id="exampleFormControlFile1"
                name="picture"
                ref={register({
                  required: "กรุณาเลือกไฟล์ภาพก่อน",
                  validate: {
                      checkFileType: (value) => {
                         return value && SUPPORT_IMAGE_FORMATS.includes(value[0].type)
                      }
                  }
                })}
                type="file"
                id="formFile"
              />
              {errors.picture && errors.picture.type === "required" && (
                <div className="invalid-feedback">{errors.picture.message}</div>
              )}

              {errors.picture && errors.picture.type === 'checkFileType' && (
                <div className="invalid-feedback">
                    รองรับเฉพาะ jpg เท่านั้น
                </div>
              )}


            </div>
            <button className="btn btn-primary" type="submit">
              Upload....
            </button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default UploadPage;
