<script setup>
definePageMeta({
  middleware: ['auth'],
  layout:'authenticated'
})
useHead({
  title: "Home",
});
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
<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <NuxtLayout>
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col class="pt-8 pr-0" cols="2">
          <home-navigation-drawer-right></home-navigation-drawer-right>
        </v-col>
        <v-col class="pt-8 w-100 px-10" cols="7" style="position: relative;">
          <card-post-options class="mb-2"></card-post-options>
          <v-card v-if="true" class="d-flex bg-transparent mb-5" height="250" flat
            style="position: relative;overflow-x: hidden">
            <div class="d-flex" style="position: absolute;top: 0;left: 0;height: 100%">
              <v-card @click="" width="150" color="secondary" variant="tonal" style="border: 2px dashed #00A896"
                class="mr-2 d-flex align-center justify-center rounded-lg">
                <v-icon size="30">mdi-plus</v-icon>
              </v-card>
              <div v-ripple="true" v-for="n in 2" style="cursor: pointer;" class="mr-2 rounded-lg bg-grey-lighten-4">
                <v-hover v-slot="{ props, isHovering }">
                  <v-img v-bind="props" style="transition: all .2s linear;"
                    :style="isHovering ? 'filter: brightness(1)' : 'filter:brightness(.7)'" height="250"
                    class="rounded-lg" width="150" :src="'https://source.unsplash.com/random/150x250?celebrity&' + n">
                    <template #placeholder>
                      <div class="h-100 w-100 d-flex align-center justify-center">
                        <v-progress-circular indeterminate size="55" color="primary" width="5"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-hover>
              </div>
            </div>
          </v-card>
          <div class="d-flex align-center pb-2">
            <v-divider thickness="2" class="mr-5" color="black"></v-divider>
            <span class="d-flex text-subtitle-2 font-weight-bold">relevant <v-icon>mdi-chevron-down</v-icon></span>
          </div>
          <v-btn v-if="false" icon="mdi-chevron-right" style="position: absolute;right: 15px;top: 250px;"></v-btn>
          <suspense>
            <card-post-container></card-post-container>
            <template #fallback>
              <skeleton-post v-for="n in 3" :key="n" class="mb-2 rounded-0 border-b" flat></skeleton-post>
            </template>
          </suspense>
        </v-col>
        <v-col cols="3" v-if="true" style="position: relative">
          <div class="pt-5">
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
            </v-card>
            <v-card class="mt-3 pa-0 border rounded-lg" flat v-if="true">
              <h5 class="pa-3 pb-0 font-weight-medium">Available job for you</h5>
              <v-divider class="my-2 mx-3"></v-divider>
              <v-list class="px-3 py-0">
                <v-list-item class="pa-2 mb-2 rounded-lg" @click="" v-for="job, n in jobs" :key="n">
                  <template #title>
                    <span class="text-subtitle-1 font-weight-bold">{{ job.title }}</span>
                  </template>
                  <template #subtitle>
                    <span class="text-subtitle-2 font-weight-bold">{{ job.description }}</span>
                  </template>
                  <div class="mt-2 font-weight-medium">{{ job.salary }}</div>
                </v-list-item>
              </v-list>
              <v-btn block class="text-capitalize" append-icon="mdi-arrow-right" size="small">See more available</v-btn>
            </v-card>
          </div>

        </v-col>
      </v-row>
    </v-container>
    <v-dialog @click:outside="$router.push('/')" persistent no-click-animation width="1250" height="650"
      :model-value="$route.name == 'index-posts-post'">
      <suspense>
        <nuxt-page></nuxt-page>
        <template #fallback>
          <v-card height="750" class="w-100 d-flex align-center justify-center" color="transparent" flat elevation="0">
            <v-progress-circular size="65" width="6" color="primary" indeterminate></v-progress-circular>
          </v-card>
        </template>
      </suspense>
    </v-dialog>
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
