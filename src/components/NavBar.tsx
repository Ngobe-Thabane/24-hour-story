import { Box, Container} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, Outlet } from "react-router";

export default function NavBar(){
  return (
    <Container>

      <Box component={'nav'} sx={{display:'flex', justifyContent:'space-between', fontSize:'1.9em', alignItems:'center'}}> 

        <p>24HourStoryFeature</p>
        <Box>
          <Link to={'/create'} style={{display:'flex', alignItems:'center', gap:2}} >
          <AddBoxIcon sx={{fontSize:30}}/>
          <span>Create</span>
          </Link>
        </Box>      
      </Box>
      <Outlet /> 
    </Container>
    );
}