<template>
    <v-card class="rounded-lg bg-grey-lighten-2"  flat >
        <div id="main">
            <div class="d-flex pa-5 py-5">
                <div class="d-flex flex-column pl-5 w-100">
                    <v-card flat height="20" class="bg-grey-lighten-4 mb-2 w-33"></v-card>
                    <v-card flat height="20" class="bg-grey-lighten-4 w-50"></v-card>
                </div>
            </div>
            <div class="pa-10 pt-0">
                <v-card flat height="250" class="bg-grey-lighten-4 rounded-0"></v-card>
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