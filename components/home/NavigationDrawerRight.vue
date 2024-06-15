<template>
    <div v-if="user" class="d-flex flex-column" style="position: sticky;top: 7.5%;">
        <v-card flat class="rounded-lg align-center pa-2 py-0 mb-1 d-flex" variant="text" 
            @click="$router.push({ name: 'alumni-alumni', params: { alumni: user.email } })">
            <avatar :user="user" size="44" class="bg-white border">
            </avatar>
            <v-list class="px-0">
                <v-list-item class="text-subtitle-2 font-weight-bold">
                    <v-list-item-title class="font-weight-bold">{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle class="font-weight-bold">View Profile</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <!-- <v-card-tit class=" d-flex h-100 ml-2 flex-column">
                <h5 class="text-no-wrap">
                </h5>
                <h6>
                    View Profile
                </h6>
            </v-card-tit> -->
        </v-card>
        <v-list class="bg-transparent mb-5 mt-2 pa-0">
            <v-list-item variant="text" @click="" color="primary" class="text-subtitle-2 font-weight-bold rounded-lg mb-2 " prepend-icon="mdi-post-outline">
                Feeds
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-history">
                Recents
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-school">
                Batchmates
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bookmark">
                Saved
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-chat">
                Messages
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-bell">
                Notifications
            </v-list-item>
            <v-list-item variant="text" @click="" class="text-subtitle-2 font-weight-bold rounded-lg mb-2" prepend-icon="mdi-domain">
                Department
            </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
       <span class="text-caption">Privacy  · Terms · Arellano Connect © 2024</span>
        <!-- 
        <v-card class="rounded-lg border" flat>
            <div class="pa-3">
                <h5 class=" font-weight-medium">Your batchmates</h5>
                <v-divider class="my-2 mb-3"></v-divider>
                <div class="d-flex flex-column mt-2">
                    <v-card flat v-for="mate, n in batchmates" :key="n" class="d-flex align-center mb-4">
                        <v-avatar size="40" class="mr-4">
                            <v-img :src="'https://source.unsplash.com/random/300x300?celebrity&' + n"></v-img>
                        </v-avatar>
                        <div>
                            <h5 class="font-weight-medium">{{ mate.firstName + ' ' + mate.lastName }}</h5>
                            <h6 class="text-caption">{{ mate.email }}</h6>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal" color="primary" rounded="lg" icon="mdi-plus" size="x-small"></v-btn>
                    </v-card>
                </div>
            </div>
            <v-btn block class="text-capitalize" append-icon="mdi-arrow-right" size="small" flat>See more
                available</v-btn>
        </v-card> -->
    </div>
</template>

<script setup lang="ts">
const $auth = useAuthStore();
const { user } = storeToRefs($auth);
// const batchmates = ["Emily Smith", "James Johnson", "Sophia Williams", "Daniel Brown", "Olivia Jones"]
const batchmates = [
  { firstName: "Emily", lastName: "Smith", email: "emily@example.com" },
  { firstName: "James", lastName: "Johnson", email: "james@example.com" },
  { firstName: "Sophia", lastName: "Williams", email: "sophia@example.com" },
  { firstName: "Daniel", lastName: "Brown", email: "daniel@example.com" },
  { firstName: "Olivia", lastName: "Jones", email: "olivia@example.com" },
  { firstName: "William", lastName: "Davis", email: "william@example.com" },
  { firstName: "Ava", lastName: "Garcia", email: "ava@example.com" },
  { firstName: "Alexander", lastName: "Martinez", email: "alexander@example.com" },
  { firstName: "Emma", lastName: "Rodriguez", email: "emma@example.com" },
  { firstName: "Michael", lastName: "Hernandez", email: "michael@example.com" }
];

const jobs = [
{
    title: "Frontend Developer",
    company: "Web Solutions Inc.",
    location: "Seattle, WA",
    salary: "$90,000",
    requirements: ["Bachelor's degree in Computer Science or related field", "Experience with HTML, CSS, and JavaScript frameworks like React or Angular", "Strong problem-solving skills"],
    benefits: ["Health insurance", "Stock options", "Remote work option"],
    responsibilities: ["Developing user-friendly web applications", "Collaborating with design and backend teams", "Implementing responsive designs"],
    description: "Join our team at Web Solutions Inc. as a Frontend Developer and contribute to building visually appealing and functional web applications.",
    applyLink: "https://example.com/apply1"
  },
  {
    title: "Data Scientist",
    company: "Insightful Analytics Co.",
    location: "Chicago, IL",
    salary: "$110,000",
    requirements: ["Master's degree in Statistics, Mathematics, or related field", "Proficiency in programming languages like Python or R", "Experience with machine learning algorithms and data visualization tools"],
    benefits: ["Health insurance", "401(k) matching", "Flexible work hours"],
    responsibilities: ["Analyzing complex data sets to extract insights", "Building predictive models", "Presenting findings to stakeholders"],
    description: "Join Insightful Analytics Co. as a Data Scientist and unlock the potential of data to drive business decisions and innovation.",
    applyLink: "https://example.com/apply2"
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureTech Solutions",
    location: "Washington, D.C.",
    salary: "$95,000",
    requirements: ["Bachelor's degree in Cybersecurity, Computer Science, or related field", "Knowledge of cybersecurity frameworks and tools", "Experience with threat detection and incident response"],
    benefits: ["Health insurance", "Gym membership reimbursement", "Paid time off"],
    responsibilities: ["Monitoring and analyzing security incidents", "Implementing security measures to protect against threats", "Conducting security audits and assessments"],
    description: "SecureTech Solutions is hiring a Cybersecurity Analyst to safeguard our systems and data from cyber threats. Join us in ensuring the security of our organization.",
    applyLink: "https://example.com/apply3"
  },
  {
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    salary: "$100,000",
    requirements: ["Bachelor's degree in Computer Science", "2+ years of experience in software development", "Proficiency in JavaScript and Node.js"],
    benefits: ["Health insurance", "401(k) matching", "Flexible work hours"],
    responsibilities: ["Developing and maintaining software applications", "Collaborating with cross-functional teams", "Participating in code reviews and testing"],
    description: "Join our dynamic team at Tech Solutions Inc. as a Software Engineer. You'll work on cutting-edge projects, collaborate with talented developers, and contribute to innovative solutions.",
    applyLink: "https://example.com/apply1"
  },
  {
    title: "Data Analyst",
    company: "Data Insights Co.",
    location: "New York, NY",
    salary: "$80,000",
    requirements: ["Bachelor's degree in Statistics, Mathematics, or related field", "Experience with data analysis tools like Python, R, or SQL", "Strong analytical and problem-solving skills"],
    benefits: ["Health insurance", "Stock options", "Remote work option"],
    responsibilities: ["Analyzing data to identify trends and patterns", "Creating visualizations and reports", "Communicating findings to stakeholders"],
    description: "Data Insights Co. is seeking a talented Data Analyst to join our team in New York. If you're passionate about uncovering insights from data and driving data-informed decisions, apply now!",
    applyLink: "https://example.com/apply2"
  },
  {
    title: "UX/UI Designer",
    company: "Creative Designs Agency",
    location: "Los Angeles, CA",
    salary: "$90,000",
    requirements: ["Bachelor's degree in Design or related field", "Proficiency in design tools like Adobe XD, Sketch, or Figma", "Experience with user research and usability testing"],
    benefits: ["Health insurance", "Gym membership reimbursement", "Paid time off"],
    responsibilities: ["Designing user interfaces for web and mobile applications", "Conducting user research to inform design decisions", "Iterating on designs based on feedback"],
    description: "Join Creative Designs Agency as a UX/UI Designer and unleash your creativity. Collaborate with talented designers, work on diverse projects, and create exceptional user experiences.",
    applyLink: "https://example.com/apply3"
  }
];

</script>

<style scoped></style>