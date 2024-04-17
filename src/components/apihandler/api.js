import axios from 'axios'

export const loginUser=async(email,password)=>{
    const res=await axios.post('/user/login',{ email, password });
    if(!res.status===200){
        throw new Error("unable to login");
    }
    const data=await res.data;
    return data;
}

export const signupUser=async(name,email,password)=>{
    const res=await axios.post('/user/signup',{ name,email, password });
    if(!res.status===201){
        throw new Error("unable to Signup");
    }
    const data=await res.data;
    return data;
}

export const authStatus=async()=>{
    const res=await axios.get('/user/auth-status');
    if(!res.status===200){
        throw new Error("unable to get status");
    }
    const data=await res.data;
    return data;
}

export const logoutUser=async()=>{
    const res=await axios.get('/user/logout');
    if(!res.status===200){
        throw new Error("unable to logout");
    }
    const data=await res.data;
    return data;
}

export const getCourse=async(name)=>{
    const res=await axios.get(`/courses/${name}`);
    if(!res.status===200){
        throw new Error("unable to get course");
    }
    const data=await res.data;
    return data;
}

export const getSingleCourse=async(name,id)=>{
    const res=await axios.get(`/courses/${name}/${id}`);
    if(!res.status===200){
        throw new Error("unable to get course");
    }
    const data=await res.data;
    return data;
}

export const enrollCourse=async(name,id)=>{
    const res=await axios.post(`/courses/${name}/${id}`);
    if(!res.status===200){
        throw new Error("unable to enroll in course");
    }
    const data=await res.data;
    return data;
}

export const  getEnrolledCourses=async()=>{
    const res=await axios.get(`/user/enrolledcourses`);
    if(!res.status===200){
        throw new Error("unable to get enrolled  courses");
    }
    const data=await res.data;
    return data;
}

export const  forgotPass=async(email)=>{
    const res=await axios.post(`/user/forgotPass`,{email});
    if(!res.status===200){
        throw new Error("unable to send email for setting new Password");
    }
    const data=await res.data;
    return data;
}
export const  resetPass=async(id,token,password)=>{
    const res=await axios.post(`/user/reset-password/${id}/${token}`,{password});
    if(!res.status===200){
        throw new Error("unable to set new Password");
    }
    const data=await res.data;
    return data;
}
export const  changePass=async(newPassword,oldPassword)=>{
    const res=await axios.post(`/user/changePassword`,{oldPassword,newPassword});
    if(!res.status===200){
        throw new Error("unable to change Password");
    }
    const data=await res.data;
    return data;
}


export const  getCategoryById=async(id)=>{
    const res=await axios.get(`/courseCategory/${id}`);
    if(!res.status===200){
        throw new Error("unable to get enrolled  courses");
    }
    const data=await res.data;
    return data;
}


export const removeCourse=async(id)=>{
    const res=await axios.delete(`/user/removecourse/${id}`);
    if(!res.status===200){
        throw new Error("unable to get enrolled  courses");
    }
    const data=await res.data;
    return data;
}

export const currentlyEnrolledUsers=async(id)=>{
    const res=await axios.get(`/courses/enrolleduser/count/${id}`);
    if(!res.status===200){
        throw new Error("unable to get enrolled  courses");
    }
    const data=await res.data;
    return data;
}
export const getOwner=async(id)=>{
    const res=await axios.get(`/courses/course/owner/${id}`);
    if(!res.status===200){
        throw new Error("unable to get owner");
    }
    const data=await res.data;
    return data;
}
export const getCoursesUploadedByUser=async()=>{
    const res=await axios.get(`/courses/yourcourses`);
    if(!res.status===200){
        throw new Error("unable to get courses Uploaded by you");
    }
    const data=await res.data;
    return data;
}

export const addInstructor=async(formdata)=>{
    const res=await axios.post(`/instructor/addInstructor`,formdata,{
        headers:{'Content-Type':'multipart/form-data'}
      });
    if(!res.status===201){
        throw new Error("unable to create an instructor");
    }
    const data=await res.data;
    return data;
}

export const getallFeedbacks=async()=>{
    const res=await axios.get(`/feedback`);
    if(!res.status===200){
        throw new Error("unable to get feedbacks!");
    }
    const data=await res.data;
    return data;
}

export const postFeedback=async(comment)=>{
    const res=await axios.post(`/feedback`,{comment});
    if(!res.status===200){
        throw new Error("unable to get feedbacks!");
    }
    const data=await res.data;
    return data;
}
