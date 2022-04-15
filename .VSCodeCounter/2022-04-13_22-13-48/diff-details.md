# Diff Details

Date : 2022-04-13 22:13:48

Directory c:\Users\Darius\Desktop\Projects\everhoury\everhoury_frontend

Total : 48 files,  856 codes, -18 comments, 87 blanks, all 925 lines

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [package-lock.json](/package-lock.json) | JSON | -35 | 0 | 0 | -35 |
| [package.json](/package.json) | JSON | 5 | 0 | 0 | 5 |
| [src/App.tsx](/src/App.tsx) | TypeScript React | 28 | 0 | 1 | 29 |
| [src/Layouts/navigations/Header.tsx](/src/Layouts/navigations/Header.tsx) | TypeScript React | 4 | 0 | 0 | 4 |
| [src/components/forms/NotificationsForm.tsx](/src/components/forms/NotificationsForm.tsx) | TypeScript React | 70 | 0 | 3 | 73 |
| [src/components/forms/ProfileForm.tsx](/src/components/forms/ProfileForm.tsx) | TypeScript React | 85 | 0 | 4 | 89 |
| [src/components/forms/RegisterForm.tsx](/src/components/forms/RegisterForm.tsx) | TypeScript React | -1 | 0 | 0 | -1 |
| [src/components/inputs/Select.tsx](/src/components/inputs/Select.tsx) | TypeScript React | 2 | 0 | 0 | 2 |
| [src/components/inputs/TimeInput.tsx](/src/components/inputs/TimeInput.tsx) | TypeScript React | 64 | 0 | 4 | 68 |
| [src/components/timer/TaskTimer.tsx](/src/components/timer/TaskTimer.tsx) | TypeScript React | 2 | 0 | 0 | 2 |
| [src/components/tracking/modals/EditTimesModal.tsx](/src/components/tracking/modals/EditTimesModal.tsx) | TypeScript React | 95 | 0 | 6 | 101 |
| [src/components/tracking/modals/EditUserModal.tsx](/src/components/tracking/modals/EditUserModal.tsx) | TypeScript React | 21 | 0 | 3 | 24 |
| [src/components/tracking/modals/ImportTaskModal.tsx](/src/components/tracking/modals/ImportTaskModal.tsx) | TypeScript React | 89 | 3 | 11 | 103 |
| [src/components/userInsights/topProjects/TopProjects.tsx](/src/components/userInsights/topProjects/TopProjects.tsx) | TypeScript React | -1 | 0 | 0 | -1 |
| [src/constants/api.ts](/src/constants/api.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [src/constants/other.ts](/src/constants/other.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/constants/routes.ts](/src/constants/routes.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/pages/reports/Reports.tsx](/src/pages/reports/Reports.tsx) | TypeScript React | 3 | 0 | 2 | 5 |
| [src/pages/team/Team.tsx](/src/pages/team/Team.tsx) | TypeScript React | 9 | 0 | 0 | 9 |
| [src/pages/team/components/dashboard/Dashboard.tsx](/src/pages/team/components/dashboard/Dashboard.tsx) | TypeScript React | 24 | 0 | 3 | 27 |
| [src/pages/team/components/dashboard/widgets/Realtime.tsx](/src/pages/team/components/dashboard/widgets/Realtime.tsx) | TypeScript React | 20 | 0 | 2 | 22 |
| [src/pages/team/components/dashboard/widgets/RealtimeUser.tsx](/src/pages/team/components/dashboard/widgets/RealtimeUser.tsx) | TypeScript React | 32 | 0 | 4 | 36 |
| [src/pages/tracking/dashboard/components/AsignedTasks/AsignedTasks.tsx](/src/pages/tracking/dashboard/components/AsignedTasks/AsignedTasks.tsx) | TypeScript React | 25 | 0 | 2 | 27 |
| [src/pages/tracking/dashboard/components/AsignedTasks/components/TasksList.tsx](/src/pages/tracking/dashboard/components/AsignedTasks/components/TasksList.tsx) | TypeScript React | 35 | 0 | 5 | 40 |
| [src/pages/tracking/project/components/tasks/CreateTaskModal.tsx](/src/pages/tracking/project/components/tasks/CreateTaskModal.tsx) | TypeScript React | 13 | 0 | 0 | 13 |
| [src/pages/tracking/timer/Statistics.tsx](/src/pages/tracking/timer/Statistics.tsx) | TypeScript React | -21 | -25 | -3 | -49 |
| [src/pages/tracking/timer/Timer.tsx](/src/pages/tracking/timer/Timer.tsx) | TypeScript React | 6 | 0 | 0 | 6 |
| [src/pages/tracking/timer/components/AccordionItem.tsx](/src/pages/tracking/timer/components/AccordionItem.tsx) | TypeScript React | 0 | 0 | -1 | -1 |
| [src/pages/tracking/timer/components/DayEntry.tsx](/src/pages/tracking/timer/components/DayEntry.tsx) | TypeScript React | 15 | 0 | 4 | 19 |
| [src/pages/user/profile/Profile.tsx](/src/pages/user/profile/Profile.tsx) | TypeScript React | 34 | 0 | 2 | 36 |
| [src/routes/MainRouter.tsx](/src/routes/MainRouter.tsx) | TypeScript React | 6 | 0 | 0 | 6 |
| [src/services/admin.service.ts](/src/services/admin.service.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [src/services/auth.service.ts](/src/services/auth.service.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/services/middleware.ts](/src/services/middleware.ts) | TypeScript | 4 | 1 | -1 | 4 |
| [src/services/notification.service.ts](/src/services/notification.service.ts) | TypeScript | 37 | 1 | 4 | 42 |
| [src/services/sse.service.ts](/src/services/sse.service.ts) | TypeScript | 22 | 0 | 3 | 25 |
| [src/services/tracking.service.ts](/src/services/tracking.service.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/store/modals/modalSlice.ts](/src/store/modals/modalSlice.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/store/modals/reducer.ts](/src/store/modals/reducer.ts) | TypeScript | 37 | 0 | 2 | 39 |
| [src/store/store.ts](/src/store/store.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/store/types/Modal.ts](/src/store/types/Modal.ts) | TypeScript | 20 | 0 | 1 | 21 |
| [src/store/types/Task.ts](/src/store/types/Task.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/store/types/User.ts](/src/store/types/User.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [src/store/users/actions.ts](/src/store/users/actions.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [src/store/users/reducer.ts](/src/store/users/reducer.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [src/store/users/types.ts](/src/store/users/types.ts) | TypeScript | 8 | 0 | 5 | 13 |
| [src/utils/notificationts.ts](/src/utils/notificationts.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/utils/timer.ts](/src/utils/timer.ts) | TypeScript | 16 | 2 | 3 | 21 |

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details