import { uploadPost } from "@/Apis/userApi/userPageRequests";
import { storage } from "@/firebase/config";
import { Avatar, Box, Button, Chip, Modal, Stack, TextField, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef } from "react";
import { FcAddImage,FcVideoCall ,FcRules } from 'react-icons/fc';
import { MdCloudUpload } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const setErrMsg = (msg: string) =>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:290,sm:400,md:400},
    bgcolor: 'background.paper',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
};

const AddPosts = (data:any) => {
     console.log('profile',data);
     
    const postImg:any = useRef()
    const [post, setPost] = React.useState<File[]>([]);
    const [caption, setCaption] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [disable , setDisable] = React.useState(true)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        let token = localStorage.getItem('userToken') as string
        
        if( post.length > 0 &&  caption ){
            let dir = Date.now();
            let random = Math.random();
            const postRef = ref(storage,'posts/'+dir+random+'/'+post[0]?.name);
            const toBase64 = (imgData:any) => 
            new Promise((resolve, reject) =>{
                const reader = new FileReader();
                reader.readAsDataURL(imgData);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error)
            }).catch((err)=>{
                console.log(err);
            })
            const imgBase :any = await toBase64(post[0]);
            await uploadString(postRef, imgBase , 'data_url').then(async()=>{
                const downloadURL = await getDownloadURL(postRef);
                let obj = {
                    postImg : downloadURL,
                    caption : caption
                }
                const response = await uploadPost(obj,token)
            })
        }else if( caption ){
            let obj = {
                caption : caption
            }
            const response = await uploadPost(obj,token)
            console.log(response);
        }else{
            setErrMsg('You must be provide a post or description')
        }
    }

    const styles = { fontSize: "1.5em" }
    return (  
       
        <Box boxShadow={2} sx={{
                borderRadius:'20px',
                py:'4px',
                pr:'15px'
            }}>
                <ToastContainer/>
                <Box p={2} mb={2} sx={{color:'#333232',display:'flex'}}>
                    <Avatar alt="DP" src={data ? data.data:'DP'} />
                    <Typography sx={{
                        backgroundColor:'#f7f7f7',
                        borderRadius:'20px',
                        marginLeft:'10px',
                        lineHeight:'2.5rem',
                        textAlign:'center',
                        width:'100%'
                    }}><a style={{marginTop:'10px' , fontSize:'13px'}}>Write a Quick Update</a></Typography>
                    <br />
                    
                </Box>
                <hr style={{width: '90%',margin:'auto'}} />
                <Typography mt={1} sx={{textAlign:'center'}}>or</Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    spacing={2}
                >
                    <Box 
                        onClick={handleOpen}
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            cursor:'pointer'
                        }}>
                            <FcAddImage style={styles}/><Typography ml={1}>Image</Typography>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',cursor:'pointer'}}><FcVideoCall style={styles}/><Typography ml={1}>Video</Typography></Box>
                    <Box sx={{display:'flex',alignItems:'center',cursor:'pointer'}}><FcRules style={styles}/><Typography ml={1}>Write</Typography></Box>
                </Stack>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{...style,outline:'none'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        select your feed
                    </Typography>
                        <Box>
                            <Box  
                                onClick={() =>postImg.current.click()}
                                sx={{
                                    height:'220px',
                                    backgroundColor:'rgb(205 205 205 / 47%)',
                                    border:'2px dashed #ababab',
                                    borderRadius:'12px',
                                    textAlign:'center',
                                }}> <MdCloudUpload style={{fontSize:'3rem',color:'#ababab',marginTop:'77px'}}/>
                                <input 
                                    type="file"
                                    name="post"
                                    ref={postImg}
                                    onChange={(e:any)=>setPost(e.target.files)}
                                    hidden
                                />
                            </Box>
                            <Box mt={1}>
                                <TextField
                                    fullWidth
                                    placeholder="captions"
                                    multiline
                                    rows={2}
                                    maxRows={10}
                                    value={caption}
                                    onChange={(e)=>setCaption(e.target.value)}
                                    id="caption"
                                    name="caption"
                                    autoComplete="caption"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" }, //styles the label
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": { borderColor: "#f22c50" },
                                        },
                                        "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderRadius: 3 },
                                        },
                                    }}
                                />
                            </Box>
                            
                                <Button
                                onClick={handleSubmit}
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    borderRadius: "15px",
                                    height: "42px",
                                    backgroundColor: "#eb1e44",
                                    "&:hover": { backgroundColor: "#eb1e44"},
                                    textTransform: "none",
                                }}
                            >
                                Post Now
                            </Button>
                    
                        </Box>
                        
                    </Box>
                </Modal>
        </Box>
    );
}
 
export default AddPosts;