import { InputOptions } from '@actions/core';

type GetInput = (name: string, options?: InputOptions | undefined) => string;

export enum Actions {
  GetPolicyNameByProfileName = 'getPolicyNameByProfileName',
  PreparePipelineResults = 'preparePipelineResults',
  PreparePolicyResults = 'preparePolicyResults',
  RemoveSandbox = 'removeSandbox',
  ValidateVeracodeApiCreds = 'validateVeracodeApiCreds',
  ValidatePolicyName = 'validatePolicyName'
}

export type Inputs = {
  action: Actions;
  vid: string;
  vkey: string;
  appname: string;
  token: string;
  check_run_id: number;
  source_repository: string;
  fail_checks_on_policy: boolean;
  fail_checks_on_error: boolean;
  sandboxname: string;
  policyname: string;
  path: string;
  start_line: number;
  end_line: number;
  break_build_invalid_policy: boolean;
  filter_mitigated_flaws: boolean;
};

export const parseInputs = (getInput: GetInput): Inputs => {
  const action = getInput('action', { required: true }) as Actions;

  // Validate the action value
  if (!Object.values(Actions).includes(action)) {
    throw new Error(`Invalid action: ${action}. It must be one of '${Object.values(Actions).join('\' or \'')}'.`);
  }

  const vid = getInput('vid');
  const vkey = getInput('vkey');
  const appname = getInput('appname', { required: true });

  const token = getInput('token');
  const check_run_id = getInput('check_run_id');
  const source_repository = getInput('source_repository');

  const fail_checks_on_policy = getInput('fail_checks_on_policy') === 'true';
  const fail_checks_on_error = getInput('fail_checks_on_error') === 'true';
  const filter_mitigated_flaws = getInput('filter_mitigated_flaws') === 'true';

  const sandboxname = getInput('sandboxname');

  const policyname = getInput('policyname');

  const path = getInput('path');
  const start_line = getInput('start_line');
  const end_line = getInput('end_line');
  const break_build_invalid_policy = getInput('break_build_invalid_policy') === 'true';


  if (source_repository && source_repository.split('/').length !== 2) {
    throw new Error('source_repository needs to be in the {owner}/{repo} format');
  }

  return { action, token, check_run_id: +check_run_id, vid, vkey, appname, 
    source_repository, fail_checks_on_policy, fail_checks_on_error, filter_mitigated_flaws, sandboxname,
    policyname, path, start_line: +start_line, end_line: +end_line, break_build_invalid_policy
   };
};

export const vaildateScanResultsActionInput = (inputs: Inputs): boolean => {
  console.log(inputs);
  if (!inputs.token || !inputs.check_run_id || !inputs.source_repository) {
    return false;
  }
  return true;
}

export const vaildateRemoveSandboxInput = (inputs: Inputs): boolean => {
  console.log(inputs);
  if (!inputs.sandboxname) {
    return false;
  }
  return true;
}

export const ValidatePolicyName = (inputs: Inputs): boolean => {
  console.log(inputs);
  if (!inputs.path || !inputs.start_line || !inputs.end_line || !inputs.break_build_invalid_policy) {
    return false;
  }
  return true;
}

export const ValidateVeracodeApiCreds = (inputs: Inputs): boolean => {
  console.log(inputs);
  if (!inputs.token || !inputs.check_run_id || !inputs.source_repository) {
    return false;
  }
  return true;
}