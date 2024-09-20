"use client"
import React from "react";
import { FormComponentProps, FormLabelProps, KeyValueObject } from "@/app/types/common";
import clsx from "clsx"
import { FormElementMapper } from "../RHF/FormElementMapper";
import FormControlWrapper from "../RHF/FormControlWrapper";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import FormLabel from "../Typography/FormLabel";

export type DynamicGridProps = FormLabelProps & {
    control: any;
    name: string;
    value: Map<number, KeyValueObject>;
    components?: Omit<FormComponentProps, "control">[],
    onChange: (value: any) => void;
    required?:boolean
}

const DynamicGrid = (props: DynamicGridProps) => {

  const {label, labelStyleClass, required=false, hiddenLabel, control, components, value= new Map([[1, {}]]), onChange} = props;

  const handleComponentChange = (id: number,name: string, newValue: string) => {

    const oldValue = new Map(value).get(id)
    const newGroups = new Map(value).set(id, {...oldValue, [name]: newValue})
    onChange(newGroups);
  };

  const addGroup = () => {
    const newId = value.size + 1;
    const newMap = new Map(value);
    newMap.set(newId, {});
    onChange(newMap)
  };

  const removeGroup = (id: number) => {
    const newMap = new Map(value);
    newMap.delete(id);
    onChange(newMap)
  };

  const renderComponent = (component: Omit<FormComponentProps, "control">, group:any, key:any, index: number) => {
    const Component = FormElementMapper[component.componentType];
    return (
              <FormControlWrapper 
                    key={`${component.name}-${index}`} 
                    control={control}
                    {...component} 
                    render={(options, labelField)=> {
                            return (<> {Component && <Component name={component.name} 
                                                                type={component.dataType}
                                                                label={component.label}
                                                                value={group?.[component.name] || "" } 
                                                                options={options}
                                                                labelField={labelField}
                                                                required={component?.validations?.required}
                                                                onChange={(e:any)=> 
                                                                handleComponentChange(key, component.name, component.dataType === "file" ? e.target?.files?.[0] : component.componentType === "input" ? e.target?.value : e)} 
                                          />}</>)} }/>
            )
  }

  return (
    <div className="container">
      <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required}/>
      <div className="flex flex-col gap-y-2">
        {[...value.entries()].map(([key, group], index) => (
          <div key={`${index}-${key}`} className="card shadow-lg p-4 bg-base-100">
            {components?.map ((component, i) => {
                if (component.componentType === "container" && component.components) {
                  return (
                    <div key={`${component.name}-${index}`} className={component.containerClass}>
                        {component.components.map ((compo, idx)=> <div key={`${compo.name}-${idx}`} className={clsx(component.itemClass)}>{renderComponent(compo, group, key, i)}</div>)}
                    </div>)
                } else {
                  return renderComponent(component, group, key, index)
                }
            })}
            <div className="flex gap-4 justify-end my-2">
              <button
                type="button"
                className="flex btn btn-error text-white"
                onClick={() => removeGroup(key)}
              >
                <XMarkIcon className="w-6 "/>
                  Remove
              </button>
              <button type="button" className="btn flex btn-primary text-white" onClick={addGroup}>
                <PlusIcon className="w-6"/>
                Add
              </button>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default DynamicGrid;
