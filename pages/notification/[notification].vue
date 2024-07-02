<template>
        <v-main>
            <v-container class="d-flex">
                <v-col cols="3">
                    <div style="position: fixed;width: 270px;">
                        <v-tabs direction="vertical">
                            <v-tab class="text-capitalize" :to="{ name: 'network' }" color="primary">All</v-tab>
                            <v-tab class="text-capitalize" :to="{ name: 'network-connection-requests' }"
                                color="primary">Unread</v-tab>
                            <v-tab class="text-capitalize" color="primary">Read</v-tab>
                        </v-tabs>
                    </div>
                </v-col>
                <v-col cols="9" class="">
                    <v-card class="pa-5 rounded-lg border">
                        <div class="mb-2 border-b pb-5">
                            <v-icon size="small" class="text-grey-darken-1 mr-4">mdi-arrow-left</v-icon>
                            <v-icon size="small" class="text-grey-darken-1 mr-4">mdi-archive</v-icon>
                            <v-icon size="small" class="text-grey-darken-1 mr-4">mdi-trash-can</v-icon>
                        </div>
                        <h2>Congratulations! You've Become a Candidate</h2>
                        <p class="py-2">Dear Joshua Sotto,</p>
                        <p class="py-2">We are thrilled to inform you that you have become a candidate for the Frontend
                            Developer position at WebTech Solutions in Seattle, WA.</p>
                        <p class=""><strong>Position Details:</strong></p>
                        <ul class="py-3">
                            <strong>Company:</strong> WebTech Solutions <br>
                            <strong>Location:</strong> Seattle, WA <br>
                            <strong>Salary:</strong> $90,000 - $110,000 pesos <br>
                            <strong>Type:</strong> Full-time <br>
                            <strong>Level:</strong> Mid-level <br>
                        </ul>
                        <p><strong>Requirements:</strong></p>
                        <v-list>
                            <v-list-item>Bachelor's degree in Computer Science or related field</v-list-item>
                            <v-list-item>3+ years of experience in frontend development</v-list-item>
                            <v-list-item>Proficiency in HTML, CSS, JavaScript, and modern frontend frameworks (e.g.,
                                React, Angular, Vue.js)</v-list-item>
                            <v-list-item>Experience with responsive design and cross-browser compatibility</v-list-item>
                        </v-list>
                        <p class="py-5"><strong>Description:</strong></p>
                        <p class="text-justify">WebTech Solutions is hiring a skilled Frontend Developer to join our team in Seattle,
                            WA. The successful candidate will be responsible for creating engaging and
                            user-friendly web applications using cutting-edge frontend technologies. Key
                            responsibilities include translating design wireframes into responsive and
                            interactive user interfaces, optimizing application performance, and ensuring
                            cross-browser compatibility. This role offers the opportunity to work on exciting
                            projects and collaborate with talented professionals in a dynamic work environment.
                        </p>
                        <p>We would like to invite you for a meeting to discuss further details:</p>
                        <p class="py-5"><strong>Location:</strong> WebTech Solutions Office, Seattle, WA</p>
                        <p class="py-5"><strong>Date:</strong> May 5, 2024</p>
                        <p>Please let us know your availability for the meeting. We will be reaching out to you
                            shortly to schedule a convenient time.</p>
                        <p>Thank you for your interest in joining our team!</p>
                        <p>Best Regards,<br>WebTech Solutions Team</p>
                    </v-card>
                </v-col>
            </v-container>
        </v-main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'authenticated',
    middleware: ['auth']
})

useHead({
    title: 'Notification - Alumni Tracking'
})
</script>

<style scoped></style>