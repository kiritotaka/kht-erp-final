<template>
  <div class="flex justify-between overflow-auto">
    <div class="flex mx-10">
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="red-darken-2"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="my-3 flex justify-between">
            <span class="font-bold">Follow</span>
            <v-btn
              variant="flat"
              prepend-icon="mdi:mdi-plus"
              color="blue-darken-4 text-sm"
              size="small"
              @click="addMore()"
              >Thêm</v-btn
            >
          </div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list0"
          group="people"
          :sort="true"
          @change="log($event, 0)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer mx-1 my-3 p-3 rounded-md text-center"
            v-for="element in list0"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div class="text-sm font-bold text-blue-darken-4">{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="blue-darken-4"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Nguyên vật liệu</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list1"
          group="people"
          @change="log($event, 1)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list1"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="cyan-darken-3"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Sắp file</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list2"
          group="people"
          @change="log($event, 2)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list2"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="teal-darken-3"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">In</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list3"
          group="people"
          @change="log($event, 3)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list3"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="green-darken-3"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Cắt</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list4"
          group="people"
          @change="log($event, 4)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list4"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="light-green-darken-2"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Gia công ráp</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list5"
          group="people"
          @change="log($event, 5)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list5"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="lime-darken-2"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Cố định</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list6"
          group="people"
          @change="log($event, 6)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list6"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="yellow-darken-2"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">KC</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list7"
          group="people"
          @change="log($event, 7)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list7"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 grid px-3 mb-4">
        <div class="bg-white p-3 grid rounded-lg h-[75px] cursor-pointer">
          <div class="w-1/3">
            <v-progress-linear
              color="amber-darken-2"
              model-value="100"
              rounded
            ></v-progress-linear>
          </div>
          <div class="font-bold my-3">Đóng gói</div>
        </div>
        <draggable
          class="dragArea list-group w-full min-h-[100px] bg-gray-200 rounded-lg"
          :list="list8"
          group="people"
          @change="log($event, 8)"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 cursor-pointer m-1 p-3 rounded-md text-center"
            v-for="element in list8"
            :key="element.name"
            @click="openDetail(element)"
          >
            <div class="flex justify-between items-center">
              <div>{{ element.name }}</div>
              <div class="text-sm">{{ formatDateVN(element.updated_at) }}</div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <AddTaskParentSectionVue
      :value="addTaskParent"
      @addTaskParentDone="addTaskParentDone"
      @close="addTaskParent = $event"
    />
    <DetailTaskParentSectionVue
      :value="taskParentDetail"
      :dataDetail="taskSelected"
      @close="taskParentDetail = $event"
      @addChildDone="addChildDone()"
      @updateChildDone="updateChildDone()"
    />
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { useCustomerStore } from "../stores/customerStore";
import { mapActions } from "pinia";
import AddTaskParentSectionVue from "./sections/AddTaskParentSection.vue";
import DetailTaskParentSectionVue from "./sections/DetailTaskParentSection.vue";
import moment from "moment";
import baseModel from "../services/base-model";
export default {
  name: "AssignPage",
  components: {
    draggable: VueDraggableNext,
    AddTaskParentSectionVue,
    DetailTaskParentSectionVue,
  },
  data() {
    return {
      enabled: true,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      list8: [],
      dragging: false,
      listData: [],
      addTaskParent: false,
      taskSelected: null,
      taskParentDetail: false,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "getListAssign",
      "fetchDetailTask",
      "updateParentTask",
    ]),
    formatDateVN(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    add() {
      console.log("add");
    },
    replace() {
      console.log("replace");
    },
    checkMove(event) {
      console.log("checkMove", event.draggedContext);
      console.log("Future index: " + event.draggedContext.futureIndex);
    },
    log(event, index) {
      const { moved, added } = event;

      if (moved) {
        moved.element.updated_at = moment(new Date()).format();
        this.updateParentTask(
          `/task_parent/${moved.element.id}`,
          moved.element
        ).then((resp) => {
          if (resp) {
            this.getAssign();
          }
        });
      }
      if (added) {
        added.element.process = index;
        this.updateParentTask(
          `/task_parent/${added.element.id}`,
          added.element
        ).then((resp) => {
          if (resp) {
            this.getAssign();
          }
        });
      }
    },
    fillterTaskStatus(list) {
      this.list0 = [];
      this.list1 = [];
      this.list2 = [];
      this.list3 = [];
      this.list4 = [];
      this.list5 = [];
      this.list6 = [];
      this.list7 = [];
      this.list8 = [];
      list.map((item) => {
        switch (item.process) {
          case 0:
            this.list0.push(item);
            break;
          case 1:
            this.list1.push(item);
            break;
          case 2:
            this.list2.push(item);
            break;
          case 3:
            this.list3.push(item);
            break;
          case 4:
            this.list4.push(item);
            break;
          case 5:
            this.list5.push(item);
            break;
          case 6:
            this.list6.push(item);
            break;
          case 7:
            this.list7.push(item);
            break;
          case 8:
            this.list8.push(item);
            break;
        }
      });
    },
    getAssign() {
      this.getListAssign("/task_parent").then((resp) => {
        if (resp) {
          this.listData = resp;
          if (this.listData) {
            this.listData = baseModel.sortLib(
              this.listData,
              "updated_at",
              "desc"
            );
            this.fillterTaskStatus(this.listData);
          }
        }
      });
    },
    addMore() {
      this.addTaskParent = true;
    },
    addTaskParentDone() {
      this.addTaskParent = false;
      this.getAssign();
    },
    getTaskDetail(data) {
      this.fetchDetailTask(`/task_parent/${data.id}`).then((resp) => {
        if (resp) {
          this.taskSelected = resp;
          this.taskParentDetail = true;
        }
      });
    },
    openDetail(data) {
      this.getTaskDetail(data);
    },
    addChildDone() {
      this.getTaskDetail(this.taskSelected);
    },
    updateChildDone() {
      this.getTaskDetail(this.taskSelected);
    },
  },
  created() {
    this.getAssign();
  },
};
</script>

<style>
</style>