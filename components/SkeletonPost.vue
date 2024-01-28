<template>
    <v-card class="rounded-0 mt-2" >
        <div class="main">
            <div class="d-flex pa-5">
                <div>
                    <v-avatar size="55" color="grey-lighten-2"></v-avatar>
                </div>
                <div class="d-flex flex-column pl-5 w-100">
                    <v-card flat height="20" class="bg-grey-lighten-2 mb-2 w-33"></v-card>
                    <v-card flat height="20" class="bg-grey-lighten-2 w-50"></v-card>
                </div>
            </div>
            <v-card flat height="250" class="bg-grey-lighten-2 rounded-0"></v-card>
            <v-card-actions>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-2 w-100"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-2 w-100"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-2 w-100"></v-card>
            </v-card-actions>
        </div>
    </v-card>
</template>

<style scoped>
.main {
    animation: blinking 3s linear infinite;
}

@keyframes blinking {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.2;
	}

	100% {
		opacity: 1;
	}
}
</style>