import User from "../models/User.js"

export const profile = async (req, res) => {
    const email = req.email
    const user = await User.findOne({ email })
    res.json({ success: true, user: user })
}

export const addJobs = async (req, res) => {
    try {
        const { companyName, jobRole, url, notes, jobStatus } = req.body;
        // Find the user and update their jobs array
        const email = req.email
        // return res.json({ data })
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.jobs.push({
            companyName,
            jobRole,
            url,
            notes,
            jobStatus,
        });

        await user.save();
        res.status(201).json({ message: 'Job added successfully' });
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
 
export const  deleteJob = async (req, res) => {
      try {
        const { id } = req.params;
        const email=req.email
      
  
        // Find the user and update their jobs array
        const user = await User.findOne({email});
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Remove the job from the user's jobs array
        const jobIndex = user.jobs.findIndex(job => job._id.toString() === id);
        if (jobIndex === -1) {
          return res.status(404).json({ message: 'Job not found' });
        }
  
        user.jobs.splice(jobIndex, 1); // Remove the job from the array
  
        await user.save();
        res.status(200).json({ message: 'Job deleted successfully' });
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Server error' });
      }
  }