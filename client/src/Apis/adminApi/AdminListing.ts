import { adminApi } from "@/utils/apis";
import { AxiosError } from "axios";

//---> Users Listing <---//
export const usersList = async () => {
    try {
        const {data} = await adminApi.get('/users')
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> User Blocking <---//
export const userBlocked = async (userId:string) => {
    try {
        console.log('here fun',userId);
        const {data} = await adminApi.patch(`/block?id=${userId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> User Unblocking <---//
export const userUnBlocked = async (userId:string) => {
    try {
        console.log('here fun',userId);
        const {data} = await adminApi.patch(`/unblock?id=${userId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> Requests Listing <---//
export const userRequests = async () => {
    try {
        const {data} = await adminApi.get('/requests')
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> Request Approval <---//
export const requestApproval = async (reqId:string) => {
    try {
        const {data} = await adminApi.patch(`/approve?id=${reqId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> Request Rejection <---//
export const requestRejection = async (reqId:string) => {
    try {
        const {data} = await adminApi.delete(`/reject?id=${reqId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const reportLists= async () => {
    try {
        const {data} = await adminApi.get('/report');
        return data;
    } catch (error) {
        console.log(error);
    }
} 


export const PostViews = async (postId:string) =>{
    try {
        const {data} = await adminApi.get(`/view?id=${postId}`)
        return data
    } catch (error) {
        console.log(error);
    }

} 

export const removeReportedPost = async (postId:string) =>{
    try {
        const {data} = await adminApi.delete(`/remove?id=${postId}`)
        return data;
    } catch (error) {
        console.log(error);
    }

}