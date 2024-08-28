import React from "react";
import Skeleton from "react-loading-skeleton";


export default function CarCardSkeleton() {

    return <>
        <div className="border m-0 p-2">
            <div className="row">
                <Skeleton height={150} />
            </div>
            <div className="row">
                <Skeleton height={25} style={{ width: '96%' }} />
            </div>
            <div className="row my-2">
                <Skeleton height={25} style={{ width: '96%' }} />
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="row">
                            <Skeleton height={25} />
                        </div>
                        <div className="row">
                            <Skeleton height={25} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="row">
                            <Skeleton height={25} />
                        </div>
                        <div className="row">
                            <Skeleton height={25} />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="row">
                            <Skeleton height={25} width={140} />
                        </div>
                        <div className="row">
                            <Skeleton height={25} width={140} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="row">
                            <Skeleton height={25} width={140} />
                        </div>
                        <div className="row">
                            <Skeleton height={25} width={140} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Skeleton height={25} style={{ width: '60%' }} />
            </div>
        </div>
    </>
}