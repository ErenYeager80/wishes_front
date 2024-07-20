    <template>
  <div
    class="w-full shadow-xl bg-gradient-to-b from-[#143045] to-[#675a3d] h-screen pt-12"
  >
    <h2 class="card-title justify-center border-t py-4 rounded-t-2xl">
      آرزو های من
    </h2>
    <h1
      v-if="!userStore.getUser"
      class="card-title justify-center pb-4 rounded-b-2xl text-[#c89763] border-b"
    >
      لطفا ابتدا وارد شوید
    </h1>
    <PerfectScrollbar v-if="userStore.getUser" class="wishes-scroll h-52">
      <div
        v-for="(wish, index) in wishesList"
        :key="index"
        class="wish-item mb-1"
      >
        <div class="wish-header flex justify-between">
          <img
            :src="
              wish.file
                ? 'https://api.wishestree.ir/' + wish.file.path
                : '/src/assets/wish-tree.png'
            "
            alt="Profile"
            class="wish-img w-10 h-10 rounded-full"
          />
          <button
            type="submit"
            @click="openModals2(wish)"
            class="hover:text-[#3a7da3] textarea-xxl font-semibold"
          >
            {{ wish.title }}
          </button>
          <div @click="handleDone(wish.id!)">
            <label class="pe-5 cursor-pointer label">
              <input type="checkbox" class="checkbox checkbox-accent" :checked="wish.done_at!=null" />
            </label>
          </div>
        </div>
        <p class="textarea-xs wish-description truncate pe-4">
          {{ wish.content }}
        </p>
      </div>
    </PerfectScrollbar>
    <WishDetail :wish="selectedWish" v-if="isModalOpen2" @close="closeModal2" />
    <div class="card-actions justify-center pt-8">
      <button
        v-if="userStore.getUser"
        type="submit"
        class="w-1/2 p-2 bg-[#3a7da3] rounded-md"
        @click="openModal"
      >
        اضافه کردن
      </button>
      <button
        @click="openModals"
        type="submit"
        class="w-1/2 p-2 bg-[#3a7da3] rounded-md"
      >
        درباره ما
      </button>
      <AboutUs v-if="isModalOpen" @close="closeModal" />
    </div>
  </div>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box bg-gradient-to-b from-[#143045] to-[#675a3d]">
      <Form @submit="handleSubmit" class="form-control mt-7 gap-3 items-center">
        <h3 class="font-bold text-lg text-center">
          اطلاعات کاربری را وارد کنید
        </h3>

        <Field
          v-model="wish.title"
          type="text"
          rules="required"
          name="wish title"
          placeholder="عنوان آرزو"
          class="input w-full max-w-xs"
        />
        <ErrorMessage
          class="flex justify-start text-red-600"
          dir="ltr"
          name="wish title"
        />
        <Field
          v-model="wish.content"
          type="text"
          name="wish content"
          rules="required"
          placeholder="متن آرزو"
          class="input w-full max-w-xs"
        />
        <ErrorMessage
          class="flex justify-start text-red-600"
          dir="ltr"
          name="wish content"
        />
        <input
          @change="uploadFile($event)"
          type="file"
          class="file-input file-input-bordered file-input-info w-full max-w-xs"
          dir="ltr"
        />
        <div class="modal-action">
          <button
            class="me-4 inline-flex items-center justify-center p-2 px-8 text-lg rounded-md bg-[#3a7da3] disabled:bg-[#2a5b75]"
            :disabled="isButton"
          >
            ثبت
            <span v-if="isButton" class="ms-2 loading loading-spinner"></span>
          </button>
          <button
            class="inline-flex items-center justify-center p-2 px-8 text-lg rounded-md bg-[#3a7da3] disabled:bg-[#2a5b75]"
            @click="closeModal1"
            type="button"
          >
            بستن
          </button>
        </div>
      </Form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import type Wish from "@/models/wish";
import { useWishStore } from "@/stores/wish";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/stores/user";
import AboutUs from "@/components/AboutUs.vue";
import { useApiStore } from "@/stores/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import WishDetail from "@/components/WishDetail.vue";
import {number} from "@m0ksem/vue-custom-scrollbar/dist/utils";

const selectedWish = ref<Wish>({} as Wish);
const isButton = ref(false);
const isModalOpen = ref(false);
const isModalOpen2 = ref(false);
const wish = ref({} as Wish);
const wishesList = ref<Wish[]>([]);
const wishStore = useWishStore();
const userStore = useUserStore();
const apiStore = useApiStore();
const $toast = useToast();

const handleDone = (id: number) => {
  wishStore.done(id).then(() => {

  })
}
const handleSubmit = () => {
  isButton.value = true;
  wishStore.add(wish.value).then(() => {
    isButton.value = false;
    $toast.success("آرزوی شما ثبت شد", {
      position: "bottom-left",
    });
    document.querySelector("#my_modal_2")!.close();
  });
};

const openModal = () => {
  if (userStore.getUser) {
    document.querySelector("#my_modal_2")!.showModal();
  } else {
    $toast.error("لطفا ابتدا وارد شوید", {
      position: "bottom-left",
    });
  }
};
const openModals = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
const openModals2 = (wish: Wish) => {
  selectedWish.value = wish;
  isModalOpen2.value = true;
};

const closeModal2 = () => {
  isModalOpen2.value = false;
};
const closeModal1 = () => {
  document.querySelector("#my_modal_2")!.close();
};
onMounted(() => {
  wishesList.value = [];
  if (userStore.getUser) {
    wishStore.list().then(({ data }) => {
      wishesList.value = data.data as Wish[];
    });
  }
});

function uploadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    const file = input.files[0];
    isButton.value = true;
    apiStore
      .post(
        import.meta.env.VITE_BASE_URL + "/file",
        { file: file },
        { "Content-Type": "multipart/form-data" }
      )
      .then((res) => {
        console.log(res);
        wish.value.imageId = res.data.data.id;
        isButton.value = false;
      });
  }
}
</script>

<style scoped>
.wishes-scroll {
  max-height: 500px !important;
  direction: rtl;
}

.wish-item {
  position: relative;
  padding-right: 3rem; /* space for image */
}

.wish-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.wish-img {
  position: absolute;
  top: 0;
  right: 0;
}

.wish-description {
  margin-top: 0;
}
</style>
