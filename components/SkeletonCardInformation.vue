<template>
    <v-card class="rounded-lg mt-2 pa-5 py-10 bg-grey-lighten-2" >
        <div id="main">
            <div class="d-flex px-2">
                <v-card flat height="30" class="bg-grey-lighten-4 mb-2 w-33"></v-card>
            </div>
            <div class="mt-10 d-flex">
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-25"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-75"></v-card>
            </div>
            <div class="mt-10 d-flex">
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-25"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-75"></v-card>
            </div>
            <div class="mt-10 d-flex">
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-25"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-75"></v-card>
            </div>
            <div class="mt-10 d-flex">
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-25"></v-card>
                <v-card flat height="25" class="mx-2 bg-grey-lighten-4 w-75"></v-card>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
#main {
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