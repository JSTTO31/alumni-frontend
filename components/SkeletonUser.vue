<template>
    <v-card class="rounded-lg border mt-2 main" flat>
        <div>
            <div class="d-flex pa-5">
                <div>
                    <v-avatar size="55" color="grey-lighten-2"></v-avatar>
                </div>
                <div class="d-flex flex-column pl-5 w-100">
                    <v-card flat height="20" class="bg-grey-lighten-2 mb-2 w-50"></v-card>
                    <v-card flat height="20" class="bg-grey-lighten-2 w-70"></v-card>
                </div>
                <div class="d-flex flex-column justify-center pl-5 w-50">
                    <v-card flat height="30" class="bg-grey-lighten-2 mb-2"></v-card>
                </div>
            </div>
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