import { Box} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function NavBar(){
  return (
    <Box component={'nav'} sx={{display:'flex', justifyContent:'space-between', fontSize:'1.9em'}}> 

      <p>24HourStoryFeature</p>

      <Box sx={{display:'flex', alignItems:'center', gap:'.1em'}}>
        <AddBoxIcon fontSize="inherit"/>
        <span>Create</span>
      </Box>      
      
    </Box>
    );
}