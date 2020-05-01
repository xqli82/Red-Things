<template>
  <div>
    用户组
    <div>
      <el-button type="primary" size="small" @click="add_group">添加权限组</el-button>
    </div>
    <div class="group-list">
      <el-table :data="groups" style="width: 100%">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="level" prop="level"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>所有权限列表:
    <el-table
      :data="stack"
      style="width: 100%"
      :default-sort="{prop:'method'}"
      stripe
      border
      height="400"
      size="small"
    >
      <el-table-column type="index" :index="indexValue" label="序号" width="150" align="center"></el-table-column>
      <el-table-column prop="method" label="Method" width="250" align="center"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
    </el-table>

    <div class="div-bg" v-show="editorShow"></div>
    <div class="div-editor" v-show="editorShow">
      <el-button @click="editorShow=false" class="btn-x" size="small">
        <i class="el-icon-close"></i>
      </el-button>

      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-col :span="12">
          <el-form-item label="权限组名:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <el-select v-model="form.groupLevel" placeholder="权限等级">
        <el-option
          v-for="item in select_opt"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>

      <div class="editor-table">
        <el-table
          ref="multipleTable"
          :data="stack"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="method" label="Method" align="center" width="150"></el-table-column>
          <el-table-column prop="url" label="URL" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div style="float:right;margin:10px 0px">
        <el-button size="small" type="danger" @click="editorShow=false">取消</el-button>
        <el-button size="small" type="primary" @click="createGroup">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stack: this.$store.state.stack,
      editorShow: false,
      editorStack: [],
      groups: [],
      form: {
        name: "",
        groupLevel: 0,
        stack: []
      },
      select_opt: [
        { name: "Level-0", value: 0 },
        { name: "Level-1", value: 1 },
        { name: "Level-2", value: 2 },
        { name: "Level-3", value: 3 },
        { name: "Level-4", value: 4 },
        { name: "Level-5", value: 5 }
      ]
    };
  },
  async created() {
    await this.$store.dispatch("getGroup");
    this.groups = this.$store.state.userGroup;
  },
  methods: {
    indexValue(index) {
      return index + 1;
    },
    add_group() {
      this.editorShow = true;
      this.editorStack = this.stack;
    },
    handleSelectionChange() {
      this.form.stack = this.editorStack;
    },
    createGroup() {
      if (!this.form.name) {
        return this.$message("名称不能为空");
      }
      this.$axios
        .post("/user/group", this.form)
        .then(res => {
          if (res.data.code === 200) {
            this.editorShow = false;
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.groups=this.$store.state.userGroup
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "warning"
          });
        });
    }
  }
};
</script>
<style scoped lang="scss">
.div-bg {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background: #888;
}
.div-editor {
  padding: 10px 20px;
  position: absolute;
  z-index: 1000;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 3px;
  width: 600px;
  min-height: 500px;
  .btn-x {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1001;
  }
}
</style>