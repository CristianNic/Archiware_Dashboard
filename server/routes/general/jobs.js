const express = require("express");
const router = express.Router();

// Mock Data
const s1_IDs = [31571, 31576, 31578, 31579, 31582, 31585, 31586, 31587];
const s2_IDs = [52832, 52833, 52839, 52842, 52845, 52846, 52847, 52851];
const s3_IDs = [17964, 17969, 17962, 17965, 17966, 17967, 17968];
const labels = ["Archive", "System"]
const results = ["success", "warning", "failure"]
const status = ["running", "scheduled", "completed"] // only running jobs have warnings.
const reports = [
	"<empty>",

	"Mounting pool BackupNFS for writing Writable volumes required in \
  pool BackupNFS -> next check at 17:08:19",

	"Running 'incr' backup for 'NASBackup' Incremental save of \
  /path/place/NASBackup/projects Save progress - volume \
  (Backup.0056/HSRG523/10232) -running ... files 167 size: \
  105.31 GB time: 15:54 min guff 99% avrg: 215.05 MB/sec \
  -> next check at 02:31:42",

	"Running 'incr' backup for 'BackupPlace' Incremental save of \
  /path/place/BackupPlace/projects Save progress - volume \
  (Backup.0047/HSRG523/10232) -running ... files 348 size: \
  112.72 GB time: 12:54 min guff 99% avrg: 215.05 MB/sec \
  -> next check at 01:21:50",

	"Mounting pool BackupNAS for writing Writable volumes required in pool \
  BackupNAS -> next check at 05:09:03",

	"Mounting pool BackupNAS for writing Writable volumes required in pool \
  BackupNAS -> next check at 23:09:03",

	"Syncing '/Volumes/backup/server' to '/Volumes/RAID1/server-sync' ... \
  Finished: copied 1747 files/folders, 358.63 MB. Warning: check file \
  access log!",

	"Syncing '/Volumes/backup/server' to '/Volumes/RAID1/server-sync' ... \
  Finished: copied 52654 files/folders, 7492.86 MB. \n Warning: check file \
  access log!",

	"Syncing '/Volumes/backup/server' to '/Volumes/nas/server-sync' ... \
  Finished: copied 68451 files/folders, 2375.37 MB. \n Warning: check file \
  access log!",
];

function jobNamesData(ids) {
	const jobs = [];
	for (let i = 0; i < ids.length; i++) {
		const job = {
			ID: ids[i],
		};
		jobs.push(job);
	}
	const jobNames = {
		jobs: jobs,
	};
	return jobNames;
}

// GET JobNames
router.route("/").get((req, res) => {
  const { server } = res.locals;
  const S1 = process.env.s1_API;
  const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  if (server === S1) {
    const jobNames = jobNamesData(s1_IDs)
    res.json(jobNames);
  } else if (server === S2) {
		const jobNames = jobNamesData(s2_IDs);
		res.json(jobNames);
  } else if (server === S3) {
		const jobNames = jobNamesData(s3_IDs);
		res.json(jobNames);
  } else {
    res.json("Not Found")
	}
});

// GET JobInfo
router.route("/:jobID").get((req, res) => {
  const randomLabels = Math.floor(Math.random() * labels.length);
  const jobInfo = {
    label: labels[randomLabels],
  };
  res.json(jobInfo);
});

// GET JobProtocol
router.route("/:jobID/protocol").get((req, res) => {
  const { server } = res.locals;
  const S1 = process.env.s1_API;
  const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  const jobID = req.params.jobID;
  if (
    (server === S1 && jobID === "31571") ||
    (server === S1 && jobID === "31576")
	) {
		const jobProtocol = {
			completion: results[2],   
			status: status[0],        
		};
		res.json(jobProtocol);
	} else if (server === S1) {
		const jobProtocol = {
			completion: results[0],
			status: status[2],
		};
    res.json(jobProtocol);
	} else if (server === S2 && jobID === "52832") {
		const jobProtocol = {
			completion: results[2],
			status: status[0],
		};
    res.json(jobProtocol);
	} else if (server === S2 && jobID === "52833") {
		const jobProtocol = {
			completion: results[1],
			status: status[2],
		};
		res.json(jobProtocol);
	} else if (server === S2) {
		const jobProtocol = {
			completion: results[0],
			status: status[2],
		};
		res.json(jobProtocol);
	} else if (server === S3 && jobID === "17964") {
		const jobProtocol = {
			completion: results[2],
			status: status[0],
		};
		res.json(jobProtocol);
	} else if (
		(server === S3 && jobID === "17969") ||
		(server === S3 && jobID === "17962")
	) {
		const jobProtocol = {
			completion: results[1],
			status: status[2],
		};
		res.json(jobProtocol);
	} else if (server === S3) {
		const jobProtocol = {
			completion: results[0],
			status: status[2],
		};
		res.json(jobProtocol);
	} else {
		res.json("Not Found");
	}
});

// GET JobReport
router.route("/:jobID/report").get((req, res) => {
  const { server } = res.locals;
  const S1 = process.env.s1_API;
  const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  const jobID = req.params.jobID;
  if (server === S1 && jobID === "31571") {
    const jobReport = {
      report: reports[1],
    };
    res.json(jobReport.report);
  } else if (server === S1 && jobID === "31576") {
		const jobReport = {
			report: reports[2],
		};
		res.json(jobReport.report);
	} else if (server === S1) {
		const jobReport = {
			report: reports[0],
		};
    res.json(jobReport.report);
  } else if (server === S2 && jobID === "52832") {
    const jobReport = {
      report: reports[4],
    };
    res.json(jobReport.report);
  } else if (server === S2 && jobID === "52833") {
    const jobReport = {
      report: reports[8],
    };
    res.json(jobReport.report);
	} else if (server === S2) {
		const jobReport = {
			report: reports[0],
		};
    res.json(jobReport.report);
  } else if (server === S3 && jobID === "17964") {
    const jobReport = {
      report: reports[5],
    };
    res.json(jobReport.report);
  } else if (server === S3 && jobID === "17969") {
    const jobReport = {
      report: reports[6],
    };
    res.json(jobReport.report);
  } else if (server === S3 && jobID === "17962") {
    const jobReport = {
      report: reports[7],
    };
    res.json(jobReport.report);
	} else if (server === S3) {
		const jobReport = {
			report: reports[0],
		};
    res.json(jobReport.report);    
	} else {
		res.json("Not Found");
	}
});

module.exports = router;