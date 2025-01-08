import { defineStore } from "pinia";
import { baseService } from "../services/base-service";
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    userListData: null,
    assignData: null,
    addParentTaskData: null,
    addChildData: null,
    parentTaskDetailData: null,
    putChildToParentData: null,
    updateChildStatusData: null,
    addCommentData: null,
    putCommentToChildData: null,
    taskCommentData: null,
    addImageData: null,
    updateImgToTaskData: null,
    createRecruitmentData: null,
    recruitmentListData: null,
    recruitmentAcceptData: null,
    addProbationData: null,
    listProbationData: null,
    addProbationCommentData: null,
    updateCommentToProbationData: null,
    probationCommentData: null,
  }),
  actions: {
    //lay danh sach user
    async getListUser(url: string) {
      await baseService.fetch(API_URL_BASE + url).then((resp) => {
        this.userListData = resp.data;
      });
      return this.userListData;
    },
    //lay sanh sach cong viec
    async getListAssign(url: string) {
      await baseService.fetch(API_URL_BASE + url).then((resp) => {
        this.assignData = resp.data;
      });
      return this.assignData;
    },
    //thêm công việc lớn
    async addParentTaskAcction(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addParentTaskData = resp.data;
      });
      return this.addParentTaskData;
    },
    //lấy chi tiết công việc lớn
    async fetchDetailTask(url: string) {
      await baseService.fetch(API_URL_BASE + url).then((resp) => {
        this.parentTaskDetailData = resp.data;
      });
      return this.parentTaskDetailData;
    },
    //thêm đều mục công việc
    async addChildAction(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addChildData = resp.data;
      });
      return this.addChildData;
    },
    //cập nhật đầu mục vào cho công việc lớn
    async updateParentTask(url: string, params: any) {
      await baseService.update(API_URL_BASE + url, params).then((resp) => {
        this.putChildToParentData = resp;
      });
      return this.putChildToParentData;
    },
    //cập nhật trạng thái cho đầu mục
    async patchStatusChild(url: string, params: any) {
      await baseService.change(API_URL_BASE + url, params).then((resp) => {
        this.updateChildStatusData = resp.data;
      });
      return this.updateChildStatusData;
    },
    //thêm ghi chú và update vào cho đầu mục
    async addCommentAction(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addCommentData = resp.data;
      });
      return this.addCommentData;
    },
    async putCommentToTask(url: string, params: any) {
      await baseService.change(API_URL_BASE + url, params).then((resp) => {
        this.putCommentToChildData = resp.data;
      });
      return this.putCommentToChildData;
    },
    //cập nhật comment vào task
    async updateTaskComment(
      urlComment: string,
      paramsComment: any,
      taskId: Number,
      paramsTask: any
    ) {
      await this.addCommentAction(urlComment, paramsComment);
      paramsTask.comment_id.push(this.addCommentData);
      await this.putCommentToTask(`/task/${taskId}`, paramsTask).then(
        (resp) => {
          this.taskCommentData = resp;
        }
      );
      return this.taskCommentData;
    },
    //thêm hình ảnh lên server
    async addImgAction(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addImageData = resp.data;
      });
      return this.addImageData;
    },
    //cập nhật image vào task
    async putImgTaskAction(url: string, params: any) {
      await baseService.change(API_URL_BASE + url, params).then((resp) => {
        this.updateImgToTaskData = resp.data;
      });
      return this.updateImgToTaskData;
    },
    //tạo yêu cầu tuyển dụng
    async postRecruitmentAction(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.createRecruitmentData = resp.data;
      });
      return this.createRecruitmentData;
    },
    //lấy danh sách tuyển dụng
    async fetchListRecruitment(url: string, params: any) {
      await baseService.fetchParams(API_URL_BASE + url, params).then((resp) => {
        this.recruitmentListData = resp.data;
      });
      return this.recruitmentListData;
    },
    //cập nhật yêu cầu tuyển dụng
    async updateRecruitment(url: string, params: any) {
      await baseService.change(API_URL_BASE + url, params).then((resp) => {
        this.recruitmentAcceptData = resp.data;
      });
      return this.recruitmentAcceptData;
    },
    //thêm nhân sự thử việc
    async addNewProbation(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addProbationData = resp.data;
      });
      return this.addProbationData;
    },
    //danh sách nhân sự thử việc
    async fetchListProbation(url: string, params: any) {
      await baseService.fetchParams(API_URL_BASE + url, params).then((resp) => {
        this.listProbationData = resp.data;
      });
      return this.listProbationData;
    },
    //Thêm mới đáng giá nhân sự
    async addProbationComment(url: string, params: any) {
      await baseService.add(API_URL_BASE + url, params).then((resp) => {
        this.addProbationCommentData = resp.data;
      });
      return this.addProbationCommentData;
    },
    //Cập nhật comment vào probation
    async updateCommentProbation(url: string, params: any) {
      await baseService.change(API_URL_BASE + url, params).then((resp) => {
        this.updateCommentToProbationData = resp.data;
      });
      return this.updateCommentToProbationData;
    },
    //action comment probation
    async actionProbationComment(paramsAdd: any, paramsUpdate: any) {
      await this.addProbationComment("/probation_comment", paramsAdd);
      paramsUpdate.probation_comment_id.push(this.addProbationCommentData.id);
      await this.updateCommentProbation(
        `/probation/${paramsUpdate.id}`,
        paramsUpdate
      ).then((resp) => {
        this.probationCommentData = resp;
      });
      return this.probationCommentData;
    },
  },
  persist: true,
});
