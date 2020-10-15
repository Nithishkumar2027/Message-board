<template>
  <div class="home">
    <h3>Full Stack Message Board</h3>

    <div class="row" v-for="message in messages" :key="message._id">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card mt-3 rounded postCard">
          <div class="card-body d-flex flex-row">
            <img
              v-bind:src="
                'https://ui-avatars.com/api/?rounded=true&name=' +
                message.username
              "
              class="rounded-circle mr-3 userAvatar"
              :alt="message.username"
            />
            <div>
              <h5 class="card-title font-weight-bold mb-2">
                {{ message.username }}
              </h5>
              <p class="card-text">
                <i class="far fa-clock pr-2"></i>{{ message.created }}
              </p>
            </div>
          </div>
          <img
            v-if="message.imageURL"
            class="card-img-top rounded-0 postImg"
            :src="message.imageURL"
            :alt="message.subject"
          />
          <div class="card-body">
            <h5>{{ message.subject }}</h5>
            <p class="card-text">{{ message.message }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = "http://localhost:3000/messages";
export default {
  name: "Home",
  data: () => ({
    messages: [],
  }),
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => (this.messages = result));
  },
};
</script>

<style scoped>
.userAvatar {
  height: 50px !important;
  width: 50px !important;
}
hr {
  border-top: 1px solid white;
}
</style>