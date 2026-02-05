"use client"
import { useQueryAutomations } from '@/hooks/user-queries'
import React from 'react'

const MetricsCard = () => {
  const { data } = useQueryAutomations()

  const totals = data?.data?.reduce(
    (acc, automation) => {
      acc.commentsReceived += automation.listener?.commentCount || 0
      acc.dmsReceived += automation.listener?.dmContent || 0
      acc.commentsReplied += automation.listener?.commentCount || 0
      acc.dmsReplied += automation.listener?.dmContent || 0

      return acc
    },
    {
      commentsReceived: 0,
      commentsReplied: 0,
      dmsReceived: 0,
      dmsReplied: 0,
    }
  )

  const commentsReceived = totals?.commentsReceived ?? 0
  const commentsReplied = totals?.commentsReplied ?? 0
  const dmsReceived = totals?.dmsReceived ?? 0
  const dmsReplied = totals?.dmsReplied ?? 0

  const getPercentage = (replied: number, total: number) =>
    total === 0 ? 0 : Math.round((replied / total) * 100)

  const commentPercentage = getPercentage(commentsReplied, commentsReceived)
  const dmPercentage = getPercentage(dmsReplied, dmsReceived)

  return (
    <div className="h-full flex lg:flex-row flex-col gap-5">
      
      {/* COMMENTS */}
      <div className="p-5 border border-border/50 rounded-xl flex flex-col h-fit w-full lg:w-6/12">
        {/* Top */}
        <div>
          <h2 className="text-3xl font-bold text-white">Comments</h2>
          <p className="text-sm text-text-secondary">On your posts</p>
        </div>

        {/* Middle (Progress Bar) */}
        <div className="my-6">
          <div className="h-2 w-full rounded-full bg-border/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all"
              style={{ width: `${commentPercentage}%` }}
            />
          </div>
        </div>

        {/* Bottom */}
        {commentsReceived === 0 ? (
          <p className="text-sm text-text-secondary">No comments yet</p>
        ) : (
          <div>
            <h3 className="text-3xl font-bold">{commentPercentage}%</h3>
            <p className="text-sm text-text-secondary">
              {commentsReplied} / {commentsReceived} replied
            </p>
          </div>
        )}
      </div>

      {/* DMS */}
      <div className="p-5 border border-border/50 rounded-xl flex flex-col h-fit w-full lg:w-6/12">
        <div>
          <h2 className="text-3xl font-bold text-white">Direct Messages</h2>
          <p className="text-sm text-text-secondary">On your account</p>
        </div>

        {/* Middle (Progress Bar) */}
        <div className="my-6">
          <div className="h-2 w-full rounded-full bg-border/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all"
              style={{ width: `${dmPercentage}%` }}
            />
          </div>
        </div>

        {dmsReceived === 0 ? (
          <p className="text-sm text-text-secondary">No DMs yet</p>
        ) : (
          <div>
            <h3 className="text-3xl font-bold">{dmPercentage}%</h3>
            <p className="text-sm text-text-secondary">
              {dmsReplied} / {dmsReceived} replied
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard
