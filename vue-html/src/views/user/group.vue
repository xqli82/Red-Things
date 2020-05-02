<template>
  <div>
    用户组
    <div>
      <el-button type="primary" size="small" @click="add_group">添加用户组</el-button>
    </div>
    <div class="group-list" style="padding: 5px 0;">
      <el-table :data="this.$store.state.userGroup" style="width: 100%" border>
        <el-table-column label="用户组名称" prop="name" align="center"></el-table-column>
        <el-table-column label="用户组等级" prop="level" align="center"></el-table-column>
        <el-table-column align="center" label="用户组操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑用户组</el-button>

            <el-popconfirm title="确定删除吗？" @onConfirm="deleteGroup(scope.row)">
              <el-button size="mini" type="danger" slot="reference">删除用户组</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>所有权限列表:
    <el-table :data="stack" style="width: 100%" :default-sort="{prop:'method'}" stripe border size="small">
      <el-table-column type="index" :index="indexValue" label="序号" width="150" align="center"></el-table-column>
      <el-table-column prop="method" label="Method" width="250" align="center"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
    </el-table>

    <div class="div-bg" v-show="addShow||editorShow"></div>

    <!-- 创建用户 -->

    <div class="div-editor" v-show="addShow">
      <el-button @click="editorShow=false" class="btn-x" size="small">
        <i class="el-icon-close"></i>
      </el-button>

      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-col :span="12">
          <el-form-item label="用户组名:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <el-select v-model="form.level" placeholder="用户等级">
        <el-option v-for="item in select_opt" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>

      <div class="editor-table">
        <el-table ref="multipleTable" :data="editorStack" tooltip-effect="dark" style="width: 100%" stripe
          :default-sort="{prop:'method'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="method" label="Method" align="center" width="150"></el-table-column>
          <el-table-column prop="url" label="URL"></el-table-column>
        </el-table>
      </div>
      <div style="float:right;margin:10px 0px">
        <el-button size="small" type="danger" @click="addShow=false">取消</el-button>
        <el-button size="small" type="primary" @click="createGroup">确定</el-button>
      </div>
      <!-- 编辑用户 -->


      <div class="div-editor" v-show="editorShow">
        <el-button @click="editorShow=false" class="btn-x" size="small">
          <i class="el-icon-close"></i>
        </el-button>

        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-col :span="12">
            <el-form-item label="用户组名:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-form>

        <el-select v-model="form.level" placeholder="用户等级">
          <el-option v-for="item in select_opt" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>

        <div class="editor-table">
          <el-table ref="multipleTable" :data="editorStack" tooltip-effect="dark" style="width: 100%" stripe
            :default-sort="{prop:'method'}">
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column prop="method" label="Method" align="center" width="150"></el-table-column>
            <el-table-column prop="url" label="URL"></el-table-column>
          </el-table>
        </div>
        <div style="float:right;margin:10px 0px">
          <el-button size="small" type="danger" @click="editorShow=false">取消</el-button>
          <el-button size="small" type="primary" @click="updateGroup">确定</el-button>
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
        addShow:false,
        editorStack: [],
        groups: [],
        form: {
          name: "",
          level: 0,
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
    created() {
      this.$store.dispatch("getGroup");
    },
    mounted() {
    },
    methods: {
      indexValue(index) {
        return index + 1;
      },
      add_group() {
        this.editorStack = this.stack
        this.$refs.multipleTable.clearSelection()
        this.addShow = true;
      },
      createGroup() {
        if (!this.form.name) {
          return this.$message("名称不能为空");
        }
        this.form.stack = this.$refs.multipleTable.selection
        this.$axios
          .post("/user/group", this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.addShow = false;
              this.$message({
                message: "创建成功",
                type: "success"
              });
              this.$store.dispatch('getGroup')
            } else {
              this.$message({
                message: "用户组名重复",
                type: "warning"
              })
            }
          })
          .catch(err => {
            this.$message({
              message: err,
              type: "warning"
            });
          });
      },
      deleteGroup(data) {
        this.$store.dispatch('deleteGroup', {
          app: this,
          data
        })
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