import { useState } from 'react';
import { Typography, TextField, Button, Container, FormControl, InputLabel, Select, Card, MenuItem, Grid, CardHeader, Drawer, Divider, Box } from '@mui/material';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState<any>({
    studentId: '',
    fullName: '',
    certificateId: '',
    issuer: '',
    issueDate: '',
    verificationStatus: 'Verified',
    description: '',
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/certificate/create', formData);
      setData(response.data); // Handle response from the backend // Handle response from the backend
      setOpen(true);
    } catch (error) {
      alert('Error:' + error);
    }
    setFormData({
      studentId: '',
      fullName: '',
      certificateId: '',
      issuer: '',
      issueDate: '',
      verificationStatus: 'Verified',
      description: '',
    })

  };

  return (
    <>
      <Container>
        <Card variant="outlined" sx={{ p: 4 }}>
          <CardHeader title="Certificate Submission Form" />
          <Divider />
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Student ID"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Certificate ID"
                  name="certificateId"
                  value={formData.certificateId}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <TextField
              label="Issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Verification Status</InputLabel>
              <Select
                name="verificationStatus"
                label="Verification Status"
                value={formData.verificationStatus}
                onChange={handleChange}
              >
                <MenuItem value="Verified">Verified</MenuItem>
                <MenuItem value="Not Verified">Not Verified</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Submit
            </Button>
          </form>
        </Card>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} sx={{ p: 8, width: '70%' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Information</Typography>
          <Divider sx={{ my: 2 }} />
          <BoxCard title="Student ID" value={data.studentId} />
          <BoxCard title="Full Name" value={data.fullName} />
          <BoxCard title="Certificate ID" value={data.certificateId} />
          <BoxCard title="Issuer" value={data.issuer} />
          <BoxCard title="Issue Date" value={data.issueDate} />
          <BoxCard title="Verification Status" value={data.verificationStatus} />
          <BoxCard title="Description" value={data.description} />
          <Divider sx={{ my: 2 }} />
          <BoxCard title="Balance" value={data.balance} />
          <BoxCard title="Transaction" value={data.transaction} />
        </Box>
      </Drawer>
    </>
  )
}
const BoxCard = (props: any) => {
  return (
    <Box>
      <Typography variant="h6" >{props.title}</Typography>
      <Typography variant="body1">{props.value}</Typography>
    </Box>
  )
}

export default App
