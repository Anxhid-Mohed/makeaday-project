import { Box, Typography } from "@mui/material";

const About = (data:any) => {
    return (  
       <Box boxShadow={1} sx={{
        borderRadius:'20px',
        border:'1px solid #dedede',
        py:'3px'
         }}>
            <Box p={2} sx={{color:'#333232'}}>
                <h4 style={{marginTop:'4px'}}>Support {data ? data.data.username :'creator'}</h4><br/>
                <Typography><a style={{marginTop:'3px',lineBreak:'anywhere'}}>{data ? data.data.about:'Hey how you doing ? . this is my page i hope you can support me also expecting more'}</a></Typography>
            </Box>
       </Box>
    );
}
 
export default About;