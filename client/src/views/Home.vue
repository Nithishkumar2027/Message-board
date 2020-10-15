<template>
  <div class="home">
    <div class="d-flex justify-content-between flex-wrap">
      <h3 class="align-self-center">Kumar's Message Board</h3>
      <button
        type="button"
        class="btn btn-primary align-self-center"
        data-toggle="modal"
        data-target="#formModal"
      >
        Create Post
      </button>
    </div>

    <div
      class="modal fade"
      id="formModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit.prevent="createPost">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <!-- Error alert -->
            <div v-if="error" class="alert alert-dismissible alert-warning">
              <button type="button" class="close" data-dismiss="alert">
                &times;
              </button>
              <h5 class="alert-heading">Error!</h5>
              <p class="mb-0">{{ error }}</p>
            </div>

            <div class="modal-body">
              <div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    v-model="post.username"
                    class="form-control"
                    id="username"
                    name="username"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input
                    type="text"
                    v-model="post.subject"
                    class="form-control"
                    id="subject"
                    placeholder="Enter a subject"
                    name="subject"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    v-model="post.message"
                    class="form-control"
                    name="message"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="imageURL">Image URL</label>
                  <input
                    type="url"
                    v-model="post.imageURL"
                    class="form-control"
                    name="imageURL"
                    id="imageURL"
                    placeholder="Put an image URL"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="row" v-for="message in reversedPost" :key="message._id">
      <div class=".d-sm-none .d-md-block col-md"></div>
      <div class="col-md-7 col-sm-7">
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
      <div class=".d-sm-none .d-md-block col-md"></div>
    </div>
  </div>
</template>

<script>
const API_URL = "api/messages";
export default {
  name: "Home",
  data: () => ({
    messages: [],
    post: {
      username: "Anonymous",
      subject: "",
      message: "",
      imageURL: "",
    },
    error: "",
  }),
  computed: {
    reversedPost() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => (this.messages = result));
  },
  methods: {
    createPost() {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.post),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            const error = result.details
              .map((detail) => detail.message)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.messages.push(result);
          }
        });
    },
  },
};
</script>

<style scoped>
.userAvatar {
  height: 50px !important;
  width: 50px !important;
}
</style>