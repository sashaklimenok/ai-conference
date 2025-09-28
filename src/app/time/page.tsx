import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import dayjs from "dayjs";
import { USER_CALENDAR, PROJECT_ASSIGNMENTS } from "./mock";

const Page = () => {
  // Generate timesheet data with tasks as rows and working days as columns
  const generateTimesheetData = () => {
    const currentMonth = dayjs();
    const currentMonthStr = currentMonth.format("YYYY-MM");

    // Get current month's calendar days
    const monthCalendar = USER_CALENDAR[0]?.days || [];

    // Filter working days for current month
    const workingDays = monthCalendar.filter(
      (day) => day.date.startsWith(currentMonthStr) && day.workDay
    );

    // Get all tasks from all projects
    const allTasks: Array<{
      taskId: string;
      taskName: string;
      projectName: string;
      projectId: string;
      billable: boolean;
      excludeHours: boolean;
      timeEntries: Record<string, number>;
    }> = [];

    PROJECT_ASSIGNMENTS.forEach((project) => {
      project.tasks?.forEach((task) => {
        allTasks.push({
          taskId: task.id,
          taskName: task.name,
          projectName: project.name.trim(),
          projectId: project.id,
          billable: task.billable,
          excludeHours: task.excludeHours,
          timeEntries: project.preCalculatedReportedHours.reduce(
            (entries, day) => {
              entries[day.date] = day.duration;
              return entries;
            },
            {} as Record<string, number>
          ),
        });
      });
    });

    return {
      workingDays: workingDays.slice(0, 15),
      allTasks: allTasks.slice(0, 8),
    }; // Limit for display
  };

  const { workingDays, allTasks } = generateTimesheetData();

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-6">
        {dayjs().format("MMMM YYYY")} - Timesheet
      </h1>

      {/* Timesheet Table - Tasks as Rows, Days as Columns */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] sticky left-0 bg-white z-10">
                Task / Project
              </TableHead>
              <TableHead className="w-[100px] sticky left-[200px] bg-white z-10">
                Billable
              </TableHead>
              {workingDays.map((day) => {
                const dayObj = dayjs(day.date);
                const isToday = dayObj.isSame(dayjs(), "day");
                return (
                  <TableHead
                    key={day.date}
                    className={`text-center min-w-[80px] ${
                      isToday ? "bg-blue-100" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">
                        {dayObj.format("D")}
                        {isToday && " 🎯"}
                      </div>
                      <div className="text-xs font-normal">
                        {dayObj.format("ddd")}
                      </div>
                    </div>
                  </TableHead>
                );
              })}
              <TableHead className="w-[80px] text-center bg-gray-50">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTasks.map((task) => {
              const totalHours = Object.values(task.timeEntries).reduce(
                (sum, hours) => sum + (hours as number),
                0
              );

              return (
                <TableRow key={task.taskId} className="hover:bg-gray-50">
                  <TableCell className="sticky left-0 bg-white z-10">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{task.taskName}</div>
                      <div className="text-xs text-gray-600">
                        {task.projectName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="sticky left-[200px] bg-white z-10 text-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        task.billable ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </TableCell>
                  {workingDays.map((day) => {
                    const hours = task.timeEntries[day.date] || 0;
                    const isToday = dayjs(day.date).isSame(dayjs(), "day");

                    return (
                      <TableCell
                        key={day.date}
                        className={`text-center ${isToday ? "bg-blue-50" : ""}`}
                      >
                        {hours > 0 ? (
                          <div className="space-y-1">
                            <div
                              className={`font-medium text-sm ${
                                task.billable
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {hours}h
                            </div>
                            <div
                              className={`w-full h-1 rounded ${
                                task.billable ? "bg-green-200" : "bg-blue-200"
                              }`}
                            >
                              <div
                                className={`h-1 rounded ${
                                  task.billable ? "bg-green-500" : "bg-blue-500"
                                }`}
                                style={{
                                  width: `${Math.min((hours / 8) * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-sm">-</span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center bg-gray-50">
                    <span
                      className={`font-bold ${
                        totalHours > 0 ? "text-blue-700" : "text-gray-400"
                      }`}
                    >
                      {totalHours}h
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Daily Totals Row */}
            <TableRow className="bg-gray-100 font-semibold border-t-2">
              <TableCell className="sticky left-0 bg-gray-100 z-10">
                Daily Totals
              </TableCell>
              <TableCell className="sticky left-[200px] bg-gray-100 z-10">
                -
              </TableCell>
              {workingDays.map((day) => {
                const dayTotal = allTasks.reduce(
                  (sum, task) => sum + (task.timeEntries[day.date] || 0),
                  0
                );
                const isToday = dayjs(day.date).isSame(dayjs(), "day");

                return (
                  <TableCell
                    key={day.date}
                    className={`text-center ${
                      isToday ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        dayTotal > 8
                          ? "text-red-600"
                          : dayTotal === 8
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {dayTotal}h
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="text-center bg-gray-100">
                <span className="font-bold text-blue-700">
                  {allTasks.reduce(
                    (sum, task) =>
                      sum +
                      Object.values(task.timeEntries).reduce(
                        (taskSum, hours) => taskSum + (hours as number),
                        0
                      ),
                    0
                  )}
                  h
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800">Working Days</h3>
          <p className="text-2xl font-bold text-blue-600">
            {workingDays.length}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800">Total Tasks</h3>
          <p className="text-2xl font-bold text-purple-600">
            {allTasks.length}
          </p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <h3 className="font-semibold text-orange-800">Total Hours</h3>
          <p className="text-2xl font-bold text-orange-600">
            {allTasks.reduce(
              (sum, task) =>
                sum +
                Object.values(task.timeEntries).reduce(
                  (taskSum, hours) => taskSum + (hours as number),
                  0
                ),
              0
            )}
            h
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
