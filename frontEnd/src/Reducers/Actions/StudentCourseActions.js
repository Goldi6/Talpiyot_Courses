export const AttendClass_Action = (classId) => ({
  type: "ATTEND_CLASS",
  classId,
});

export const UnattendedClassReason_Action = (classId) => ({
  type: "UNATTENDED_CLASS_REASON",
  classId,
});
