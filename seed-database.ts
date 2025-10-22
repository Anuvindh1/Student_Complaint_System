import { storage } from "./server/storage";

const sampleComplaints = [
  {
    studentName: "Rahul Kumar",
    department: "Computer Science Engineering (CSE)" as const,
    issueTitle: "Lab Equipment Not Working",
    description: "The computers in Lab 3 are outdated and frequently crash during practical sessions. This is affecting our ability to complete assignments on time.",
    status: "resolved" as const
  },
  {
    studentName: "Priya Sharma",
    department: "Electronics & Communication Engineering (ECE)" as const,
    issueTitle: "Canteen Food Quality Issues",
    description: "The food quality in the main canteen has deteriorated significantly. Many students have complained about stale food and poor hygiene standards.",
    status: "pending" as const
  },
  {
    studentName: "Amit Patel",
    department: "Mechanical Engineering" as const,
    issueTitle: "Library Book Shortage",
    description: "There are insufficient reference books in the library for our core subjects. Students have to wait weeks to access important study materials.",
    status: "resolved" as const
  },
  {
    studentName: "Sneha Reddy",
    department: "Information Technology (IT)" as const,
    issueTitle: "Wi-Fi Connectivity Problems",
    description: "The Wi-Fi network in the academic block frequently disconnects, making it difficult to attend online classes and access learning resources.",
    status: "pending" as const
  },
  {
    studentName: "Vikram Singh",
    department: "Civil Engineering" as const,
    issueTitle: "Hostel Maintenance Required",
    description: "The hostel rooms need urgent maintenance. Issues include leaking pipes, broken windows, and malfunctioning electrical fixtures.",
    status: "pending" as const
  },
  {
    studentName: "Anjali Verma",
    department: "Electrical & Electronics Engineering (EEE)" as const,
    issueTitle: "Classroom AC Not Working",
    description: "Air conditioning units in multiple classrooms are not functioning, making it very uncomfortable during afternoon sessions especially in summer.",
    status: "resolved" as const
  }
];

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    for (const complaint of sampleComplaints) {
      const created = await storage.createComplaint({
        studentName: complaint.studentName,
        department: complaint.department,
        issueTitle: complaint.issueTitle,
        description: complaint.description
      });
      
      if (complaint.status === "resolved") {
        await storage.updateComplaintStatus(created.id, { status: "resolved" });
      }
      
      console.log(`✓ Added: ${complaint.issueTitle} (${complaint.status})`);
    }
    
    console.log("\n✅ Database seeding completed successfully!");
    console.log(`Total complaints added: ${sampleComplaints.length}`);
    console.log(`Resolved: ${sampleComplaints.filter(c => c.status === "resolved").length}`);
    console.log(`Pending: ${sampleComplaints.filter(c => c.status === "pending").length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedDatabase();
