<template>
  <div class="date-time-range">
    <el-date-picker
      v-model="startTime"
      type="datetime"
      :placeholder="startPlaceholder"
      :picker-options="pickerOptionsStart()"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      @input="startTimeChange"
      :value-format="valueFormat"
    ></el-date-picker>
    <span class="separator">至</span>
    <el-date-picker
      v-model="endTime"
      type="datetime"
      :placeholder="endPlaceholder"
      :picker-options="pickerOptionsEnd()"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      @input="endTimeChange"
      :value-format="valueFormat"
    ></el-date-picker>
  </div>
</template>

<script lang="ts" src="./DateTimeRange.ts"></script>

<style lang="scss" scoped>
.date-time-range {
  display: flex;
  align-items: center;
  .separator {
    margin: 0 5px;
  }
}
</style>
